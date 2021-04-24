import { Request, Response } from 'express';

import { CustomError } from '../../../errors/CustomError';
import RequestService from '../services/RequestService';

class RequestController {
  async create(request: Request, response: Response) {
    const requestService = new RequestService();

    const created = await requestService.create(request.body);

    if (created.success) {
      return response.status(201).json(created.data);
    }

    throw new CustomError(created.message);
  }
}

export default RequestController;
