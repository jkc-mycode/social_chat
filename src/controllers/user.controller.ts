import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserService } from '../services/user.service';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  // 회원가입
  signUp: RequestHandler = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      // 서비스 로직을 통해 사용자 생성
      const user = await this.userService.signUp(email, password, name);

      res.status(201).json({
        message: '회원 가입 성공',
        data: { user },
      });
    } catch (err: any) {
      next(err);
    }
  };

  // 로그인
  signIn: RequestHandler = async (req, res, next) => {
    try {
      // request에 있는 user 가져옴
      const user: User = req.user as User;

      // JWT 토큰 발급
      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_KEY as string,
        {
          expiresIn: '2h', // 토큰 만료 시간 설정
        }
      );

      res.status(200).json({
        message: '로그인 성공',
        data: { accessToken },
      });
    } catch (err: any) {
      next(err);
    }
  };
}
