import { Router } from 'express';

import { createMiddleware, editMiddleware } from '../middlewares';
import UserController from './UserController';

const router = Router();

const userController = new UserController();

router.post('/', createMiddleware, userController.create);
router.get('/list', userController.list);
router.get('/detail/:id', userController.detail);
router.patch('/edit/:id', editMiddleware, userController.edit);

export default router;
