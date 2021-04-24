import { getCustomRepository } from 'typeorm';
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

interface ResponseType {
  success: boolean;
  data?: object;
  message?: string;
}

class RequestService {
  async create(payload: CreateType): Promise<ResponseType> {
    try {
      const { userId, host, ddl, description, timeToRun, schedule } = payload;

      let { databases } = payload;

      const requestRepository = getCustomRepository(RequestsRepository);

      databases = JSON.stringify(databases);

      const requestCreated = requestRepository.create({
        user_id: userId,
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
}

export default RequestService;
