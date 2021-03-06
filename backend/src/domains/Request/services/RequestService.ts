import mysql from 'mysql';
import util from 'util';

import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../User/repositories/UsersRepository';
import { RequestsRepository } from '../repositories/RequestsRepository';

import {
  CreateType,
  DetailType,
  EditBodyType,
  ExplainType,
  IdParamType,
  ListType,
  ResponseListType,
  ResponseType,
} from '../@types';
import { ReviewsRepository } from '../../Review/repositories/ReviewsRepository';

class RequestService {
  async create(payload: CreateType): Promise<ResponseType> {
    try {
      const { userId, host, ddl_command, description, time_to_run, schedule } =
        payload;

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
        time_to_run,
        schedule,
        ddl_command,
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

  async list(query: ListType): Promise<ResponseListType> {
    try {
      const requestRepository = getCustomRepository(RequestsRepository);

      let { take, skip, status } = query;

      const [data, total] = await requestRepository.findAndCount({
        where: {
          status: parseInt(status),
        },
        relations: ['user'],
        take: parseInt(take),
        skip: parseInt(skip),
        order: {
          created_at: 'DESC',
        },
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

  async detail(params: DetailType): Promise<ResponseType> {
    try {
      const { id } = params;

      const requestRepository = getCustomRepository(RequestsRepository);

      let request = await requestRepository.findOne({
        where: {
          id,
        },
        relations: ['user'],
      });

      const reviewRepository = getCustomRepository(ReviewsRepository);

      const reviews = await reviewRepository.find({
        where: {
          request: id,
        },
        relations: ['user'],
      });

      return {
        success: true,
        data: { ...request, reviews: reviews },
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async explain(payload: ExplainType): Promise<ResponseType> {
    try {
      const { id, database } = payload;

      const requestRepository = getCustomRepository(RequestsRepository);

      const request = await requestRepository.findOne({
        id,
      });

      let host = request.host.split(':')[0] || 'DEFAULT';

      if (host) {
        host = host.toUpperCase();
      }

      var connection = await mysql.createConnection({
        host: process.env[`DB_EXPLAIN_HOST_${host}`],
        port: process.env[`DB_EXPLAIN_PORT_${host}`],
        user: process.env[`DB_EXPLAIN_USERNAME_${host}`],
        password: process.env[`DB_EXPLAIN_PASSWORD_${host}`],
        database: database,
      });

      await connection.connect();

      const query = util.promisify(connection.query).bind(connection);

      const sql = `EXPLAIN ${request.ddl_command}`;

      const rows = await query(sql);

      await connection.end();

      return {
        success: true,
        data: rows,
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  async edit(
    params: IdParamType,
    payload: EditBodyType
  ): Promise<ResponseType> {
    try {
      const { id } = params;

      const requestRepository = getCustomRepository(RequestsRepository);

      if (payload.databases) {
        payload.databases = JSON.stringify(payload.databases);
      }

      const request = await requestRepository.save({
        id,
        ...payload,
      });

      return {
        success: true,
        data: request,
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
