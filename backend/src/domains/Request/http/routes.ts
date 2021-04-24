import { Router } from 'express';
import { createMiddleware } from '../middlewares';
import { RequestController } from './RequestController';

const router = Router();

const requestController = new RequestController();

router.post('/', createMiddleware, requestController.create);

export default router;
