import express from 'express';
import { userController } from '../controllers/userController.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post(
    '/registration',
    [
      body('email').isEmail(),
      body('password').isLength({ min: 1, max: 150 }),
    ],
    userController.registration
  );

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

export default router;