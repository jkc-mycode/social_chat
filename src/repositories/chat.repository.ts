import { Chat, PrismaClient } from '@prisma/client';
import { CustomError } from '../errors/http.error';

export class ChatRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // 타입에 따른 메시지 목록 조회
  getMessages = async (
    type: string,
    userId: number,
    partnerId: number | null = null
  ): Promise<Chat[]> => {
    try {
      let messages = undefined;
      if (partnerId) {
        messages = await this.prisma.chat.findMany({
          where: { type, userId, partnerId },
        });
      } else {
        messages = await this.prisma.chat.findMany({
          where: { type },
        });
      }

      return messages;
    } catch (err: any) {
      throw new CustomError(err.message, err.statusCode);
    }
  };

  // 메시지 DB에 저장
  saveMessage = async (
    message: string,
    userId: number,
    type: string
  ): Promise<Chat> => {
    try {
      const newMessage = await this.prisma.chat.create({
        data: { message, userId, type },
      });

      return newMessage;
    } catch (err: any) {
      throw new CustomError(err.message, err.statusCode);
    }
  };
}
