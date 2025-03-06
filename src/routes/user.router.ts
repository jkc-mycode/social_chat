import express from 'express';
import passport from 'passport';
import { prisma } from '../utils/prisma';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import isSignIn from '../middlewares/sign-in-check.middleware';

const router = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 회원가입 페이지 렌더링
router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

// 로그인 페이지 렌더링
router.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

// 회원가입 API
router.post('/sign-up', isSignIn(false), userController.signUp);

// 로그인 API
router.post(
  '/sign-in',
  isSignIn(false),
  passport.authenticate('local'),
  userController.signIn
);

// 로그아웃 API
router.post('/sign-out', isSignIn(true), userController.signOut);

export default router;
