import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function globalExceptionHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Response {
  console.log(err)
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server',
  });
}
