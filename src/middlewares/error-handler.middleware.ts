import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/http.error';

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || '서버 오류가 발생했습니다.';
  res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
