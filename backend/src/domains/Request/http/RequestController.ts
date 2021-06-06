import { Request, Response } from 'express';

import { CustomError } from '../../../errors/CustomError';
import {
  CustomRequest,
  ListType,
  ExplainQueryType,
  IdParamType,
  EditBodyType,
} from '../@types';

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

  async list(request: CustomRequest<any, ListType>, response: Response) {
    const requestService = new RequestService();

    const listed = await requestService.list(request.query);

    if (listed.success) {
      return response.status(200).json({
        data: listed.data,
        total: listed.total,
      });
    }

    throw new CustomError(listed.message);
  }

  async detail(
    request: CustomRequest<any, any, IdParamType>,
    response: Response
  ) {
    const requestService = new RequestService();

    const getted = await requestService.detail(request.params);

    if (getted.success) {
      return response.status(200).json(getted.data);
    }

    throw new CustomError(getted.message);
  }

  async explain(
    request: CustomRequest<any, ExplainQueryType, IdParamType>,
    response: Response
  ) {
    const requestService = new RequestService();

    const payload = {
      ...request.query,
      ...request.params,
    };

    const getted = await requestService.explain(payload);

    if (getted.success) {
      return response.status(200).json(getted.data);
    }

    throw new CustomError(getted.message);
  }

  async edit(
    request: CustomRequest<EditBodyType, any, IdParamType>,
    response: Response
  ) {
    const requestService = new RequestService();

    const getted = await requestService.edit(request.params, request.body);

    if (getted.success) {
      return response.status(200).json(getted.data);
    }

    throw new CustomError(getted.message);
  }
}

export default RequestController;
