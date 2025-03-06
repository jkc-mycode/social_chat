import { Server } from 'socket.io';
import isSignIn from './middlewares/sign-in-check.middleware';
import passport from 'passport';
import { ChatRepository } from './repositories/chat.repository';
import { ChatService } from './services/chat.service';
import { prisma } from './utils/prisma';

export default (server: any, app: any, sessionMiddleware: any) => {
  const io = new Server(server, { path: '/socket.io' });
  app.set('io', io);

  const chat = io.of('/chat');
  const wrap = (middleware: any) => (socket: any, next: any) =>
    middleware(socket.request, {}, next);
  chat.use(wrap(sessionMiddleware));
  chat.use(wrap(passport.initialize()));
  chat.use(wrap(passport.session()));
  chat.use(wrap(isSignIn(true))); // 로그인 여부 체크

  const chatRepository = new ChatRepository(prisma);
  const chatService = new ChatService(chatRepository);

  chat.on('connection', async (socket) => {
    console.log('chat 네임스페이스 접속');

    // 현재 사용자 정보 먼저 전송
    socket.emit('currentUser', (socket.request as any).user);

    // 페이지 타입에 따른 초기 메시지 요청 처리
    socket.on('joinPage', async (pageType) => {
      if (pageType === 'public') {
        // 공개 채팅방일 때
        const messages = await chatRepository.getMessages(
          'public',
          (socket.request as any).user.id
        );
        socket.emit('existingMessages', messages);
        chat.emit('userJoined', { user: (socket.request as any).user });
      }
    });

    // 현재 사용자 정보 요청 처리
    socket.on('getCurrentUser', () => {
      socket.emit('currentUser', (socket.request as any).user);
    });

    // private 메시지 목록 요청 처리
    socket.on('requestMessages', async (data) => {
      const messages = await chatRepository.getMessages(
        data.type,
        (socket.request as any).user.id,
        data.type === 'private' ? data.targetId : null // private일 때만 targetId 전달
      );
      socket.emit('existingMessages', messages);
    });

    // 사용자 목록 요청 처리
    socket.on('requestUserList', () => {
      // 모든 사용자 정보 수집
      const users = Array.from(chat.sockets.values()).map((socket) => {
        const user = (socket.request as any).user;
        return user;
      });

      // 모든 업데이트된 사용자 목록 전송
      chat.emit('updateUserList', users);
    });

    socket.on('sendMessage', async (data) => {
      try {
        const message = data.message;
        const userId = (socket.request as any).user.id;
        const type = data.type;
        const targetId = data.targetId;

        const newMessage = await chatService.sendMessage(
          message,
          userId,
          type,
          targetId
        );

        if (type === 'private') {
          // private 메시지는 발신자와 수신자에게만 전송
          const targetSocket = Array.from(chat.sockets.values()).find(
            (s) => (s.request as any).user.id === parseInt(targetId)
          );

          // 발신자에게 전송
          socket.emit('newMessage', {
            newMessage,
            user: (socket.request as any).user,
          });

          // 수신자가 접속해 있다면 전송
          if (targetSocket) {
            targetSocket.emit('newMessage', {
              newMessage,
              user: (socket.request as any).user,
            });
          }
        } else {
          // 공개 메시지는 모든 사용자에게 전송
          chat.emit('newMessage', {
            newMessage,
            user: (socket.request as any).user,
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
