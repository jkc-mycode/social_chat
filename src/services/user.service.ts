import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
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
}
