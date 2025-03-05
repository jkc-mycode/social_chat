import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('데이터베이스 연결 성공');
  } catch (err) {
    console.error('데이터베이스 연결 실패');
    console.log(err);
  }
}

connectToDatabase();
