import { Request, Response } from 'express';
import { CustomError } from '../../../errors/CustomError';
import UserService from '../services/UserService';

class UserController {
  async authenticate(request: Request, response: Response) {
    const userService = new UserService();

    const authenticated = await userService.authenticate(request.body);

    if (authenticated.success) {
      return response.status(200).json(authenticated.data);
    }

    throw new CustomError(authenticated.message, 401);
  }

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
