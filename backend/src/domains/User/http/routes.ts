import { Router } from 'express';

import { authMiddleware, createMiddleware } from '../middlewares';
import UserController from './UserController';

const router = Router();

const userController = new UserController();

router.post('/authenticate', authMiddleware, userController.authenticate);
router.post('/', createMiddleware, userController.create);

export default router;
