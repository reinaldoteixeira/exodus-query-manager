import { Router } from 'express';

import {
  createMiddleware,
  listMiddleware,
  editMiddleware,
} from '../middlewares';
import RequestController from './RequestController';

const router = Router();

const requestController = new RequestController();

router.post('/', createMiddleware, requestController.create);
router.get('/list', listMiddleware, requestController.list);
router.get('/detail/:id', requestController.detail);
router.get('/explain/:id', requestController.explain);
router.patch('/edit/:id', editMiddleware, requestController.edit);

export default router;
