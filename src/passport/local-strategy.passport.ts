import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from '../utils/prisma';
import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CustomError } from '../errors/http.error';

const userRepository = new UserRepository(prisma);

// LocalStrategy 설정
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email: string, password: string, done) => {
      try {
        // 이메일로 사용자 조회
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: '사용자를 찾을 수 없습니다.' });
        }

        // 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new CustomError('비밀번호가 일치하지 않습니다.', 401);
        }

        // 비밀번호 제거 후 사용자 반환
        user.password = '';
        return done(null, user);
      } catch (err: any) {
        return done(err);
      }
    }
  )
);

// 사용자 직렬화
// 로그인 시 호출됨, 사용자 정보를 세션에 저장
passport.serializeUser((user: User, done: (err: any, id?: number) => void) => {
  done(null, user.id);
});

// 사용자 역직렬화
// 사용자가 인증된 상태에서 요청 보낼 때 호출됨
// 세션에서 사용자 정보를 복원
passport.deserializeUser(
  async (id: number, done: (err: any, user?: User | false | null) => void) => {
    try {
      const user = await userRepository.getUserById(id);
      if (!user) {
        return done(null, false);
      }
      // 비밀번호는 제외하고 req.user에 저장
      user.password = '';
      done(null, user);
    } catch (err: any) {
      done(err);
    }
  }
);

export default passport;
