import * as Yup from 'yup';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../../errors/CustomError';

export const createMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    content: Yup.string().required('content is required'),
  });

  try {
    await schema.validate(request.body);
    return next();
  } catch (err) {
    throw new CustomError(err.message, 422);
  }
};

export const editMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    id: Yup.string().required('id is required'),
    content: Yup.string().required('content is required'),
  });

  try {
    await schema.validate({
      ...request.body,
      ...request.params,
    });
    return next();
  } catch (err) {
    throw new CustomError(err.message, 422);
  }
};
