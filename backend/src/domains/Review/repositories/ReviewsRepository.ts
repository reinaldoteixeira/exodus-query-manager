import { EntityRepository, Repository } from 'typeorm';
import { Review } from '../models/Review';

@EntityRepository(Review)
class ReviewsRepository extends Repository<Review> {}

export { ReviewsRepository };
