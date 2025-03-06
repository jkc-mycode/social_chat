import express from 'express';
import userRouter from './user.router';
import isSignIn from '../middlewares/sign-in-check.middleware';

const router = express.Router();

router.use('/user', userRouter);
router.get('/chat', isSignIn(true), (req, res) => {
  res.render('multi-chat');
});
// router.use('/chat');

export default router;
