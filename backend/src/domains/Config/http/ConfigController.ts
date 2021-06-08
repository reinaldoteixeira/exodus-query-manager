import { Request, Response } from 'express';

import { CustomError } from '../../../errors/CustomError';
import { CustomRequest, EditBodyType, IdParamType } from '../@types';
import ConfigService from '../services/ConfigService';

class ConfigController {
  async create(request: Request, response: Response) {
    const configService = new ConfigService();

    const created = await configService.create(request.body);

    if (created.success) {
      return response.status(201).json(created.data);
    }

    throw new CustomError(created.message);
  }

  async list(request: Request, response: Response) {
    const configService = new ConfigService();

    const getted = await configService.list();

    if (getted.success) {
      return response.status(200).json(getted.data);
    }

    throw new CustomError(getted.message);
  }

  async edit(
    request: CustomRequest<EditBodyType, any, IdParamType>,
    response: Response
  ) {
    const configService = new ConfigService();

    const updated = await configService.edit(request.params, request.body);

    if (updated.success) {
      return response.status(200).json(updated.data);
    }

    throw new CustomError(updated.message);
  }
}

export default ConfigController;
