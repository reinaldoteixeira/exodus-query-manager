import { Router } from 'express';

import authRouter from './domains/Auth/http/routes';
import requestRouter from './domains/Request/http/routes';
import useRouter from './domains/User/http/routes';
import reviewRouter from './domains/Review/http/routes';

import { authMiddleware } from './middlewares';

const router = Router();

router.use('/authenticate', authRouter);
router.use('/users', authMiddleware, useRouter);
router.use('/requests', authMiddleware, requestRouter);
router.use('/reviews', authMiddleware, reviewRouter);

export { router };
