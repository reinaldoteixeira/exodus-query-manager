import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';

interface CreateType {
  name: string;
  email: string;
  role: string;
  password: string;
}

interface ResponseType {
  success: boolean;
  data?: object;
  message?: string;
}

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
}

export default UserService;
