import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// jwt 인증 미들웨어
const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  // 헤더에 있는 토큰 검사
  const token = req.headers.authorization?.split(' ')[1];
  // 토큰이 없으면 에러 반환
  if (!token) {
    res.status(401).json({ message: '토큰이 없습니다.' });
    return;
  }

  try {
    // 토큰 검증
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
};

export default jwtAuth;
