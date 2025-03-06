import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config(); // 환경 변수 설정
import expressSession from 'express-session';
import router from './routes/index';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';
import passport from './passport/local-strategy.passport';
import isSignIn from './middlewares/sign-in-check.middleware';

const app = express();
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 제공 경로 설정 미들웨어
app.use(express.static(path.join(__dirname, 'public')));

// JSON 및 url 데이터 파싱 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 세션 설정 미들웨어 (passport에서 사용)
app.use(
  expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

// passport 초기화 및 세션 설정
app.use(passport.initialize());
app.use(passport.session());

// 기본 서버 체크
app.get('/test', (req: Request, res: Response) => {
  console.log(req.user);
  res.send('Hello World!');
});

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
