import { Router } from 'express';

import requestRouter from './domains/Request/http/routes';
import useRouter from './domains/User/http/routes';

const router = Router();

router.use('/users', useRouter);
router.use('/requests', requestRouter);

export { router };
