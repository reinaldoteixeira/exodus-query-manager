import * as Yup from 'yup';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../../errors/CustomError';

export const createMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatorio'),
    email: Yup.string()
      .email('Email precisa ser valido')
      .required('Email é obrigatorio'),
  });

  try {
    await schema.validate(request.body);
    return next();
  } catch (err) {
    throw new CustomError(err.message, 422);
  }
};
