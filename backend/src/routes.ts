import { Router } from 'express';

import authRouter from './domains/Auth/http/routes';
import requestRouter from './domains/Request/http/routes';
import useRouter from './domains/User/http/routes';
import reviewRouter from './domains/Review/http/routes';
import configRouter from './domains/Config/http/routes';

import { authMiddleware } from './middlewares';

const router = Router();

router.use('/authenticate', authRouter);
router.use('/users', authMiddleware, useRouter);
router.use('/requests', authMiddleware, requestRouter);
router.use('/reviews', authMiddleware, reviewRouter);
router.use('/configs', authMiddleware, configRouter);

export { router };
