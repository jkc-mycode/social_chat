import { CustomError } from '../errors/http.error';
import { ChatRepository } from '../repositories/chat.repository';
import { Chat } from '@prisma/client';

export class ChatService {
  private chatRepository: ChatRepository;
  constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  sendMessage = async (
    message: string,
    userId: number,
    type: string,
    targetId?: number
  ): Promise<Chat> => {
    try {
      const newMessage = await this.chatRepository.saveMessage(
        message,
        userId,
        type,
        targetId
      );

      return newMessage;
    } catch (err: any) {
      throw new CustomError(err.message, err.statusCode);
    }
  };
}
