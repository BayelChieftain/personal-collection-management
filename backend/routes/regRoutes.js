import express from 'express';
import { userController } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

router.post(
    '/',
    [
      body('email').isEmail(),
      body('password').isLength({ min: 3, max: 32 }),
    ],
    userController.registration
  );

export default router;