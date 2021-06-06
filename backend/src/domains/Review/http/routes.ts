import { Router } from 'express';

import { createMiddleware, deleteMiddleware } from '../middlewares';

import ReviewController from './ReviewController';

const router = Router();

const reviewController = new ReviewController();

router.post('/', createMiddleware, reviewController.createReview);
router.delete('/:id', deleteMiddleware, reviewController.deleteReview);

export default router;
