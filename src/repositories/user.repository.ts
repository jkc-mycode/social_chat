import { PrismaClient, User } from '@prisma/client';
import { CustomError } from '../errors/http.error';

export class UserRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // 회원가입
  signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<User> => {
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });

      return user;
    } catch (err: any) {
      throw new CustomError(err.message, err.statusCode);
    }
  };

  // 이메일로 사용자 조회
  getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (err: any) {
      throw new CustomError(err.message, err.statusCode);
    }
  };

  // 로그인
  signIn = async (email: string, password: string) => {
    try {
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
