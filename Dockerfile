# Dockerfile
FROM node:22.13.1

WORKDIR /app

# package.json 및 package-lock.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 소스코드 복사
COPY . .

# Prisma 설정
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
