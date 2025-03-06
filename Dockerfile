# Dockerfile
FROM node:22.13.1

# netcat 설치
RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# package.json 및 package-lock.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 소스코드 복사
COPY . .

# Prisma 설정
RUN npx prisma generate

EXPOSE 3000

# 데이터베이스 대기 후 마이그레이션 실행 및 앱 시작
CMD ["/bin/sh", "-c", "echo 'Waiting for MySQL...' && while ! nc -z mysql 3306; do sleep 1; echo 'Waiting for MySQL...'; done && echo 'MySQL is ready!' && npx prisma migrate deploy && npm run dev"]
