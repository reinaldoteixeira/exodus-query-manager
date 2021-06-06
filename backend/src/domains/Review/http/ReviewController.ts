import { Request, Response } from 'express';

import { CustomError } from '../../../errors/CustomError';
import { CustomRequest, IdParamType } from '../@types';

import ReviewService from '../services/ReviewService';

class ReviewController {
  async createReview(request: Request, response: Response) {
    const reviewService = new ReviewService();

    const created = await reviewService.createReview(request.body);

    if (created.success) {
      return response.status(201).json(created.data);
    }

    throw new CustomError(created.message);
  }

  async deleteReview(
    request: CustomRequest<any, any, IdParamType>,
    response: Response
  ) {
    const reviewService = new ReviewService();
    const deleted = await reviewService.deleteReview(request.params);
    if (deleted.success) {
      return response.status(200).json(deleted.data);
    }
    throw new CustomError(deleted.message);
  }
}

export default ReviewController;
