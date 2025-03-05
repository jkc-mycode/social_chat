import express from 'express';
import passport from 'passport';
import { prisma } from '../utils/prisma';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 회원가입 API
router.post('/sign-up', userController.signUp);

// 로그인 API
router.post('/sign-in', passport.authenticate('local'), userController.signIn);

// 로그아웃 API
// router.post('/sign-out', userController.signOut);

export default router;
