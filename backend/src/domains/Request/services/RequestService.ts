import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../User/repositories/UsersRepository';
import { RequestsRepository } from '../repositories/RequestsRepository';

interface CreateType {
  userId: string;
  host: string;
  ddl: string;
  databases: string;
  description: string;
  timeToRun: string;
  schedule: string;
}

interface QueryType {
  status?: number;
  take: number;
  skip: number;
}

interface ResponseType {
  success: boolean;
  data?: object;
  message?: string;
}

interface ResponseListType {
  success: boolean;
  data?: object;
  total?: number;
  message?: string;
}

class RequestService {
  async create(payload: CreateType): Promise<ResponseType> {
    try {
      const { userId, host, ddl, description, timeToRun, schedule } = payload;

      let { databases } = payload;

      const requestRepository = getCustomRepository(RequestsRepository);
      const userRepository = getCustomRepository(UsersRepository);

      databases = JSON.stringify(databases);

      const user = await userRepository.findOne({
        id: userId,
      });

      const requestCreated = requestRepository.create({
        user: user,
        host,
        databases,
        description,
        time_to_run: timeToRun,
        schedule,
        ddl_command: ddl,
        status: 0,
      });

      await requestRepository.save(requestCreated);

      return {
        success: true,
        data: requestCreated,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
  async list(query: QueryType): Promise<ResponseListType> {
    try {
      const requestRepository = getCustomRepository(RequestsRepository);

      const { take, skip } = query;

      delete query.take;
      delete query.skip;

      const [data, total] = await requestRepository.findAndCount({
        where: query,
        relations: ['user'],
        take: take,
        skip: skip,
      });

      return {
        success: true,
        data,
        total,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

export default RequestService;
