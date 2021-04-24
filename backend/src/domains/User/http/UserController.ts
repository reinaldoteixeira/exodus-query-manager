import { Request, Response } from 'express';
import { CustomError } from '../../../errors/CustomError';
import UserService from '../services/UserService';

class UserController {
  async create(request: Request, response: Response) {
    const userService = new UserService();

    const created = await userService.create(request.body);

    if (created.success) {
      return response.status(201).json(created.data);
    }

    throw new CustomError(created.message);
  }
}

export default UserController;
