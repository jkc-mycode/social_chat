# GameSpring 소셜 채팅 애플리케이션

## 프로젝트 소개
이 프로젝트는 실시간 소셜 채팅 애플리케이션입니다. Express.js와 Socket.IO를 사용하여 구현되었으며, MySQL 데이터베이스를 사용합니다.

## 기술 스택
- Backend: Node.js, Express.js, TypeScript
- Database: MySQL 8.0
- ORM: Prisma
- 실시간 통신: Socket.IO
- 인증: Passport.js, JWT
- 컨테이너화: Docker, Docker Compose

## 시스템 요구사항
- Docker
- Docker Compose
- Node.js 18 이상 (로컬 개발 시)

## 프로젝트 구동 방법

### 1. 환경 설정
프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 작성합니다:

```env
DATABASE_URL="mysql://root:123123@mysql:3306/social_chat"
MYSQL_USER="root"
MYSQL_ROOT_PASSWORD="123123"
MYSQL_DATABASE="social_chat"

PORT=3000
SESSION_SECRET="your_session_secret"
ACCESS_TOKEN_KEY="your_access_token_key"
REFRESH_TOKEN_KEY="your_refresh_token_key"
```

### 2. Docker를 사용한 실행
1. Docker 컨테이너 빌드 및 실행:
```bash
docker-compose up --build
```

2. 애플리케이션 접속:
- 웹 브라우저에서 `http://localhost:3000/user/sign-in` 접속

### 3. 로컬 개발 환경 설정 (선택사항)
1. 의존성 설치:
```bash
npm install
```

2. Prisma 클라이언트 생성:
```bash
npx prisma generate
```

3. 데이터베이스 마이그레이션:
```bash
npx prisma migrate dev
```

4. 개발 서버 실행:
```bash
npm run dev
```

## 주요 기능
- 사용자 인증 (회원가입/로그인)
- 실시간 공개 채팅
- 1:1 개인 채팅
- 채팅 내역 저장 및 조회

## API 엔드포인트
- POST `/api/auth/signup`: 회원가입
- POST `/api/auth/login`: 로그인
- GET `/api/chat`: 채팅 내역 조회
- POST `/api/chat`: 채팅 메시지 전송

## 데이터베이스 스키마
프로젝트는 Prisma를 사용하여 다음과 같은 스키마를 가집니다:
- User: 사용자 정보
- Chat: 채팅 메시지

## 문제 해결
- 데이터베이스 연결 오류 발생 시:
  1. Docker 컨테이너가 모두 실행 중인지 확인
  2. `.env` 파일의 DATABASE_URL이 올바르게 설정되었는지 확인
  3. Docker 컨테이너 재시작: `docker-compose down && docker-compose up`

## 데이터베이스 설정
1. 데이터베이스 복원 (선택사항)
   ```bash
   # Docker 컨테이너가 실행 중인 상태에서
   cat backup.sql | docker exec -i mysql_db mysql -u root -p123123 social_chat
   ```

2. 또는 Prisma 마이그레이션 실행
   ```bash
   npx prisma migrate deploy
   ```

## 라이선스
MIT License 