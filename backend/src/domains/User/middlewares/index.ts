import * as Yup from 'yup';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../../errors/CustomError';

export const createMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Email should be valid')
      .required('Email is required'),
  });

  try {
    await schema.validate(request.body);
    return next();
  } catch (err) {
    throw new CustomError(err.message, 422);
  }
};

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email should be valid')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  try {
    await schema.validate(request.body);
    return next();
  } catch (err) {
    throw new CustomError(err.message, 422);
  }
};
