import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import { UsersRepository } from '../../User/repositories/UsersRepository';

interface AuthType {
  email: string;
  password: string;
}

interface ResponseType {
  success: boolean;
  data?: object;
  message?: string;
}

class AuthService {
  async authenticate(payload: AuthType): Promise<ResponseType> {
    const { email, password } = payload;

    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepository.findOne({
      select: ['id', 'email', 'name', 'role', 'password'],
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      return {
        success: false,
        message: 'No authenticate',
      };
    }

    const result = await compare(password, userAlreadyExists.password);

    if (!result) {
      return {
        success: false,
        message: 'No authenticate',
      };
    }

    const token = jwt.sign(email, process.env.TOKEN_SECRET);

    delete userAlreadyExists.password;

    return {
      success: true,
      data: {
        user: userAlreadyExists,
        token: token,
      },
    };
  }
}

export default AuthService;
