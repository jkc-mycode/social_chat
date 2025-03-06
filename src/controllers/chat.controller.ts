import { RequestHandler } from 'express';
import { ChatService } from '../services/chat.service';
import { ChatRepository } from '../repositories/chat.repository';

export class ChatController {
  private chatService: ChatService;
  private chatRepository: ChatRepository;
  constructor(chatService: ChatService, chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
    this.chatService = chatService;
  }

  // 채팅 목록 조회
  getMessages: RequestHandler = async (req, res, next) => {
    try {
      const { type, partnerId } = req.body;
      const messages = await this.chatRepository.getMessages(
        type,
        req.user.id,
        partnerId
      );

      res.status(200).json({
        data: { messages },
      });
    } catch (err: any) {
      next(err);
    }
  };

  // 채팅 전송
  sendMessage: RequestHandler = async (req, res, next) => {
    try {
      const { message, type } = req.body;
      const newMessage = await this.chatService.sendMessage(
        message,
        req.user.id,
        type
      );

      res.status(201).json({
        data: { newMessage },
      });
    } catch (err: any) {
      next(err);
    }
  };
}
