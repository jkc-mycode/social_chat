import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomError } from '../errors/http.error';

export class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  // 회원가입
  signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<User> => {
    try {
      // 사용자 조회 (중복 여부 확인)
      const isExistUser = await this.userRepository.getUserByEmail(email);
      if (isExistUser) {
        throw new CustomError('이미 존재하는 사용자입니다.', 409);
      }

      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 사용자 생성
      const user = await this.userRepository.signUp(
        email,
        hashedPassword,
        name
      );

      // 비밀번호 제외
      user.password = '';

      return user;
    } catch (err: any) {
      throw new CustomError(err.message, err.statusCode);
    }
  };

  // 로그인
  signIn = async (email: string, password: string): Promise<string> => {
    try {
      // 사용자 조회
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new CustomError('사용자를 찾을 수 없습니다.', 404);
      }

      // 비밀번호 비교
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new CustomError('비밀번호가 일치하지 않습니다.', 401);
      }

      // JWT 토큰 발급
      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_KEY as string,
        {
          expiresIn: '6h',
        }
      );

      return accessToken;
    } catch (err: any) {
      throw new CustomError(err.message, err.statusCode);
    }
  };

  // 로그아웃
  signOut = async () => {
    try {
    } catch (err: any) {
      throw new CustomError(err.message, err.statusCode);
    }
  };
}
