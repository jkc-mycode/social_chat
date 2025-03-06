import { Server } from 'socket.io';
import isSignIn from './middlewares/sign-in-check.middleware';
import passport from 'passport';

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

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스 접속');
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
    });
  });
};
