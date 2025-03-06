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
      if (type === 'private' && partnerId) {
        // private 채팅은 양방향 메시지를 모두 조회
        messages = await this.prisma.chat.findMany({
          include: { User: { select: { name: true } } },
          where: {
            type,
            OR: [
              { AND: [{ userId }, { partnerId }, { type: 'private' }] },
              {
                AND: [
                  { userId: partnerId },
                  { partnerId: userId },
                  { type: 'private' },
                ],
              },
            ],
          },
          orderBy: {
            createdAt: 'asc',
          },
        });
      } else {
        // 공개 채팅은 type만으로 조회
        messages = await this.prisma.chat.findMany({
          include: { User: { select: { name: true } } },
          where: { type: 'public' },
          orderBy: {
            createdAt: 'asc',
          },
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
    type: string,
    targetId?: number
  ): Promise<Chat> => {
    try {
      const newMessage = await this.prisma.chat.create({
        data: {
          message,
          userId,
          type,
          partnerId: targetId,
        },
      });

      return newMessage;
    } catch (err: any) {
      throw new CustomError(err.message, err.statusCode);
    }
  };
}
