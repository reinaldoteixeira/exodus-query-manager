import * as Yup from 'yup';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../../errors/CustomError';

export const createMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    userId: Yup.string().required('userId is required'),
    requestId: Yup.string().required('requestId is required'),
    action: Yup.number().required('action is required'),
    observation: Yup.string().nullable(),
  });

  try {
    await schema.validate(request.body);
    return next();
  } catch (err) {
    throw new CustomError(err.message, 422);
  }
};

export const deleteMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    id: Yup.string().required('requestId is required'),
  });

  try {
    await schema.validate(request.params);
    return next();
  } catch (err) {
    throw new CustomError(err.message, 422);
  }
};
