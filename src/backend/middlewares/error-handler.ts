import { NextFunction, Request, Response } from 'express';

import { AppError } from '#/backend/server/AppError';

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => next(res.status(err.statusCode ?? 500).json({ ...err }));
