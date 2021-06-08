import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import {
  ResponseListType,
  IdParamType,
  EditBodyType,
  CreateType,
  ResponseType,
} from '../@types';

import { UsersRepository } from '../repositories/UsersRepository';

class UserService {
  async create(payload: CreateType): Promise<ResponseType> {
    try {
      const { name, email, role } = payload;
      let { password } = payload;

      const userRepository = getCustomRepository(UsersRepository);

      const userAlreadyExists = await userRepository.findOne({
        email,
      });

      if (userAlreadyExists) {
        return {
          success: false,
          message: 'User already exists!',
        };
      }

      password = bcrypt.hashSync(password);

      const userCreated = userRepository.create({
        name,
        email,
        role,
        password,
      });

      await userRepository.save(userCreated);

      return {
        success: true,
        data: userCreated,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async list(): Promise<ResponseListType> {
    try {
      const userRepository = getCustomRepository(UsersRepository);

      const users = await userRepository.find();

      return {
        success: true,
        data: users,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async detail(params: IdParamType): Promise<ResponseType> {
    try {
      const { id } = params;

      const userRepository = getCustomRepository(UsersRepository);

      const user = await userRepository.findOne({
        id,
      });

      return {
        success: true,
        data: user,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async edit(
    params: IdParamType,
    payload: EditBodyType
  ): Promise<ResponseType> {
    try {
      const { id } = params;

      const userRepository = getCustomRepository(UsersRepository);

      if (payload.password) {
        payload.password = bcrypt.hashSync(payload.password);
      }

      await userRepository.update(id, { ...payload });

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

export default UserService;
