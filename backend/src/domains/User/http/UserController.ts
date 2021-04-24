import { Request, Response } from 'express';
import { CustomError } from '../../../errors/CustomError';
import UserService from '../services/UserService';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async authenticate(request: Request, response: Response) {}

  async create(request: Request, response: Response) {
    const created = await this.userService.create(request.body);

    if (created.success) {
      return response.status(201).json(created.data);
    }

    throw new CustomError(created.message);
  }
}

export { UserController };
