import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  // 회원가입
  signUp: RequestHandler = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      // 서비스 로직
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
      const { email, password } = req.body;

      // 서비스 로직
      const accessToken = await this.userService.signIn(email, password);

      res.status(200).json({
        message: '로그인 성공',
        data: { accessToken },
      });
    } catch (err: any) {
      next(err);
    }
  };

  // 로그아웃
  signOut: RequestHandler = async (req, res, next) => {
    try {
      // 사용자 정보
      const user = req.user;

      // 서비스 로직
      await this.userService.signOut(user.id);

      res.status(200).json({
        message: '로그아웃 성공',
      });
    } catch (err: any) {
      next(err);
    }
  };
}
