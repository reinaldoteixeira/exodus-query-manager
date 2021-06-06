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
    host: Yup.string().required('Host is required'),
    databases: Yup.array().of(Yup.object()).required('Databases are required'),
    ddl: Yup.string().required('DDL is required'),
    description: Yup.string().required('Description is required'),
    timeToRun: Yup.string().required('Time to run is required'),
    schedule: Yup.string()
      .nullable(true)
      .when('timeToRun', {
        is: 'schedule',
        then: Yup.string().required('Schedule is required'),
      }),
  });

  try {
    await schema.validate(request.body);
    return next();
  } catch (err) {
    throw new CustomError(err.message, 422);
  }
};

export const listMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    status: Yup.number(),
    take: Yup.number().required(),
    skip: Yup.number().required(),
  });

  try {
    await schema.validate(request.query);
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
    id: Yup.string(),
    userId: Yup.string(),
    host: Yup.string(),
    databases: Yup.array().of(Yup.object()),
    ddl: Yup.string(),
    description: Yup.string(),
    timeToRun: Yup.string(),
    schedule: Yup.string().nullable(true).when('timeToRun', {
      is: 'schedule',
      then: Yup.string(),
    }),
  });

  try {
    await schema.validate({ ...request.body, ...request.params });
    return next();
  } catch (err) {
    throw new CustomError(err.message, 422);
  }
};
