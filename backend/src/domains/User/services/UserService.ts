import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

interface createType {
  name: string;
  email: string;
}

interface ResponseType {
  success: boolean;
  data?: object;
  message?: string;
}

class UserService {
  async create(payload: createType): Promise<ResponseType> {
    try {
      const { name, email } = payload;

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

      const userCreated = userRepository.create({
        name,
        email,
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
