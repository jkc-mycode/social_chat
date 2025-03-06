import { Server } from 'socket.io';
import isSignIn from './middlewares/sign-in-check.middleware';
import passport from 'passport';
import { ChatRepository } from './repositories/chat.repository';
import { ChatService } from './services/chat.service';
import { prisma } from './utils/prisma';

export default (server: any, app: any, sessionMiddleware: any) => {
  const io = new Server(server, { path: '/socket.io' });
  app.set('io', io);

  // chat 네임스페이스 생성
  const chat = io.of('/chat');

  // Express 미들웨어를 Socket.IO에서 사용할 수 있도록 변환
  const wrap = (middleware: any) => (socket: any, next: any) =>
    middleware(socket.request, {}, next);

  // 소켓 연결에 필요한 미들웨어 설정
  chat.use(wrap(sessionMiddleware)); // 세션 관리
  chat.use(wrap(passport.initialize())); // Passport 초기화
  chat.use(wrap(passport.session())); // Passport 세션
  chat.use(wrap(isSignIn(true))); // 로그인 상태 확인

  // 채팅 관련 클래스 인스턴스 생성
  const chatRepository = new ChatRepository(prisma);
  const chatService = new ChatService(chatRepository);

  chat.on('connection', async (socket) => {
    console.log('chat 네임스페이스 접속');

    // 현재 사용자 정보 먼저 전송
    socket.emit('currentUser', socket.request.user);

    // 페이지 타입에 따른 초기 메시지 요청 처리
    socket.on('joinPage', async (pageType) => {
      if (pageType === 'public') {
        // 공개 채팅방일 때
        const messages = await chatRepository.getMessages(
          'public',
          socket.request.user.id
        );
        socket.emit('existingMessages', messages);
        chat.emit('userJoined', { user: socket.request.user });
      }
    });

    // 현재 사용자 정보 요청 처리
    socket.on('getCurrentUser', () => {
      socket.emit('currentUser', socket.request.user);
    });

    // private 메시지 목록 요청 처리
    socket.on('requestMessages', async (data) => {
      const messages = await chatRepository.getMessages(
        data.type,
        socket.request.user.id,
        data.type === 'private' ? data.targetId : null // private일 때만 targetId 전달
      );
      socket.emit('existingMessages', messages);
    });

    // 사용자 목록 요청 처리
    socket.on('requestUserList', () => {
      // 현재 접속 중인 모든 사용자 정보 수집
      const users = Array.from(chat.sockets.values()).map((socket) => {
        const user = socket.request.user;
        return user;
      });

      // 모든 업데이트된 사용자 목록 전송
      chat.emit('updateUserList', users);
    });

    /**
     * 메시지 전송 처리
     * - 공개 메시지: 모든 사용자에게 전송
     * - 1:1 메시지: 특정 사용자에게만 전송
     * - 메시지 저장 및 실시간 전달
     */
    socket.on('sendMessage', async (data) => {
      try {
        const message = data.message;
        const userId = socket.request.user.id;
        const type = data.type;
        const targetId = data.targetId;

        // 메시지 저장 및 새 메시지 객체 생성
        const newMessage = await chatService.sendMessage(
          message,
          userId,
          type,
          targetId
        );

        if (type === 'private') {
          // private 메시지는 발신자와 수신자에게만 전송
          const targetSocket = Array.from(chat.sockets.values()).find(
            (socket) => socket.request.user.id === parseInt(targetId)
          );

          // 발신자에게 전송
          socket.emit('newMessage', {
            newMessage,
            user: socket.request.user,
          });

          // 수신자가 접속해 있다면 전송
          if (targetSocket) {
            targetSocket.emit('newMessage', {
              newMessage,
              user: socket.request.user,
            });
          }
        } else {
          // 공개 메시지는 모든 사용자에게 전송
          chat.emit('newMessage', {
            newMessage,
            user: socket.request.user,
          });
        }
      } catch (err: any) {
        console.error(err);
      }
    });

    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 접속 해제');
    });
  });
};
