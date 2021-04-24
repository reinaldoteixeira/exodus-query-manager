import { EntityRepository, Repository } from 'typeorm';
import { Request } from '../models/Request';

@EntityRepository(Request)
class RequestsRepository extends Repository<Request> {}

export { RequestsRepository };
