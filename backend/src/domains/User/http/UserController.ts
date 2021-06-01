import { Request, Response } from 'express';

import { CustomError } from '../../../errors/CustomError';
import { CustomRequest, IdParamType, EditBodyType } from '../@types';
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

  async list(request: Request, response: Response) {
    const userService = new UserService();

    const listed = await userService.list();

    if (listed.success) {
      return response.status(200).json(listed.data);
    }

    throw new CustomError(listed.message);
  }

  async detail(
    request: CustomRequest<any, any, IdParamType>,
    response: Response
  ) {
    const userService = new UserService();

    const getted = await userService.detail(request.params);

    if (getted.success) {
      return response.status(200).json(getted.data);
    }

    throw new CustomError(getted.message);
  }

  async edit(
    request: CustomRequest<EditBodyType, any, IdParamType>,
    response: Response
  ) {
    const userService = new UserService();

    const getted = await userService.edit(request.params, request.body);

    if (getted.success) {
      return response.status(200).json(getted.data);
    }

    throw new CustomError(getted.message);
  }
}

export default UserController;
