import { Request, Response } from 'express';
import { CustomError } from '../../../errors/CustomError';
import RequestService from '../services/RequestService';

class RequestController {
  private requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  async create(request: Request, response: Response) {
    const created = await this.requestService.create(request.body);

    if (created.success) {
      return response.status(201).json(created.data);
    }

    throw new CustomError(created.message);
  }
}

export { RequestController };
