import express from 'express';
import isSignIn from '../middlewares/sign-in-check.middleware';
import { ChatRepository } from '../repositories/chat.repository';
import { prisma } from '../utils/prisma';
import { ChatService } from '../services/chat.service';
import { ChatController } from '../controllers/chat.controller';

const router = express.Router();

const chatRepository = new ChatRepository(prisma);
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService, chatRepository);

// 채팅 페이지 렌더링
router.get('/', isSignIn(true), (req, res) => {
  res.render('multi-chat');
});

// 채팅 목록 조회 API
router.get('/messages', isSignIn(true), chatController.getMessages);

// 채팅 전송 API
router.post('/messages', isSignIn(true), chatController.sendMessage);

// 채팅방 유저 목록 조회 API

export default router;
