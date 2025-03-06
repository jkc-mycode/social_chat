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

    // 기존 메시지부터 가져오기
    const messages = await chatRepository.getMessages(
      'public',
      socket.request.user.id
    );
    socket.emit('existingMessages', messages);

    // 입장 메시지 출력
    chat.emit('userJoined', { user: socket.request.user });

    // Emit the updated user list to all clients
    const users = Array.from(chat.sockets.values()).map(
      (socket) => socket.request.user
    );
    chat.emit('updateUserList', users);

    socket.on('sendMessage', async (data) => {
      try {
        const message = data.message;
        const userId = socket.request.user.id;
        const type = data.type;
        const newMessage = await chatService.sendMessage(message, userId, type);

        chat.emit('newMessage', { newMessage, user: socket.request.user });
      } catch (err: any) {
        console.error(err);
      }
    });
    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 접속 해제');

      // Emit the updated user list to all clients
      const users = Array.from(chat.sockets.values()).map(
        (socket) => socket.request.user
      );
      chat.emit('updateUserList', users);
    });
  });
};
