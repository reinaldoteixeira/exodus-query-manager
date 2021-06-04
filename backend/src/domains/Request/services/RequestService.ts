import mysql from 'mysql';
import util from 'util';

import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../User/repositories/UsersRepository';
import { RequestsRepository } from '../repositories/RequestsRepository';

import {
  CreateType,
  DetailType,
  ExplainType,
  ListType,
  ResponseListType,
  ResponseType,
} from '../@types';

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

      const request = await requestRepository.findOne({
        where: {
          id,
        },
        relations: ['user'],
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

  async explain(payload: ExplainType): Promise<ResponseType> {
    try {
      const { id, database } = payload;

      const requestRepository = getCustomRepository(RequestsRepository);

      const request = await requestRepository.findOne({
        id,
      });

      var connection = await mysql.createConnection({
        host: process.env.DB_EXPLAIN_HOST,
        port: process.env.DB_EXPLAIN_PORT,
        user: process.env.DB_EXPLAIN_USERNAME,
        password: process.env.DB_EXPLAIN_PASSWORD,
        database: database,
      });

      await connection.connect();

      const query = util.promisify(connection.query).bind(connection);

      const sql = `EXPLAIN ${request.ddl_command}`;

      console.log(sql);

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
}

export default RequestService;
