import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../User/repositories/UsersRepository';
import { RequestsRepository } from '../../Request/repositories/RequestsRepository';
import { ReviewsRepository } from '../repositories/ReviewsRepository';

import { CreateType, IdParamType, ResponseType } from '../@types';

class ReviewService {
  async createReview(payload: CreateType): Promise<ResponseType> {
    try {
      const { userId, requestId, action, observation } = payload;

      const reviewsRepository = getCustomRepository(ReviewsRepository);
      const requestRepository = getCustomRepository(RequestsRepository);
      const userRepository = getCustomRepository(UsersRepository);

      const user = await userRepository.findOne({
        id: userId,
      });

      const request = await requestRepository.findOne({
        id: requestId,
      });

      const reviewCreated = reviewsRepository.create({
        request: request,
        user: user,
        action,
        observation,
      });

      await reviewsRepository.save(reviewCreated);

      return {
        success: true,
        data: reviewCreated,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async deleteReview(params: IdParamType): Promise<ResponseType> {
    try {
      const { id } = params;

      const reviewsRepository = getCustomRepository(ReviewsRepository);

      await reviewsRepository.delete({
        id,
      });

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

export default ReviewService;
