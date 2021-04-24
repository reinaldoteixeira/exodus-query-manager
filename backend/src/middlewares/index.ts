import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { CustomError } from '../errors/CustomError';

export const authMiddleware = async (
  request: Request,
  response: Response,
  _next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const [, token] = authorization.split(' ');

  try {
  } catch (err) {}
};

export const errorMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: `Internal server error ${err.message}`,
  });
};
