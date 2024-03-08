import express from 'express';
import { userController } from '../controllers/userController.js';
import { body } from 'express-validator';

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

export default router;