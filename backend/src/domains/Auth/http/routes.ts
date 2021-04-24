import { Router } from 'express';

import { authMiddleware } from '../middlewares';
import AuthController from './AuthController';

const router = Router();

const authController = new AuthController();

router.post('/', authMiddleware, authController.authenticate);

export default router;
