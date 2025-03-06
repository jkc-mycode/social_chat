import { RequestHandler } from 'express';
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

      // 서비스 로직을 통해 사용자 생성
      await this.userService.signUp(email, password, name);

      // 회원가입 성공 후 로그인 페이지로 리다이렉션
      res.redirect('/user/sign-in');
    } catch (err: any) {
      next(err);
    }
  };

  // 로그인
  signIn: RequestHandler = async (req, res, next) => {
    try {
      // 로그인 성공 후 메인 페이지로 리다이렉션
      res.redirect('/chat');
    } catch (err: any) {
      next(err);
    }
  };

  // 로그아웃
  signOut: RequestHandler = async (req, res, next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.send('로그아웃되었습니다.');
      });
    } catch (err: any) {
      next(err);
    }
  };
}
