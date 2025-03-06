import express from 'express';
import userRouter from './user.router';
import chatRouter from './chat.router';

const router = express.Router();

router.use('/user', userRouter);
router.use('/chat', chatRouter);

export default router;
