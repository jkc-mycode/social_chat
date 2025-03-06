import { NextFunction, Request, RequestHandler, Response } from 'express';

const isSignIn = (signIn: boolean) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (signIn) {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.status(401).json({
          message: '로그인이 필요합니다.',
        });
      }
    } else {
      if (!req.isAuthenticated()) {
        next();
      } else {
        res.status(401).json({
          message: '이미 로그인 상태입니다.',
        });
      }
    }
  };
};

export default isSignIn;
