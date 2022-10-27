import { CelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '#/backend/server/AppError';

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CelebrateError) {
    const first = err.details.keys().next().value;
    // eslint-disable-next-line no-useless-escape
    const message = err.details.get(first)?.message.replace(/\"/g, "'");
    return next(
      res.status(400).json({ statusCode: 400, type: 'BAD_REQUEST', message }),
    );
  }

  return next(
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      type: err.type,
      message: err.message,
    }),
  );
};
