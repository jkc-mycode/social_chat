import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import expressSession from 'express-session';
import { prisma } from './utils/prisma';
import router from './routes/index';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';

const app = express();
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// 기본 서버 체크
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// 기본 라우터 추가
app.use('/', router);

// 에러 핸들러 미들웨어
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  errorHandlerMiddleware(err, req, res, next);
});

app.listen(PORT, () => {
  console.log('서버 실행 중....');
});
