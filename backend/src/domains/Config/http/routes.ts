import { Router } from 'express';

import { createMiddleware, editMiddleware } from '../middlewares';

import ConfigController from './ConfigController';

const router = Router();

const configController = new ConfigController();

router.post('/add', createMiddleware, configController.create);
router.get('/list', configController.list);
router.patch('/edit/:id', editMiddleware, configController.edit);

export default router;
