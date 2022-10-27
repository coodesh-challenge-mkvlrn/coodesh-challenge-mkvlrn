import { NextFunction, Request, Response } from 'express';

// because express is weird and it won't pass async errors to the main handler
// solved with https://stackoverflow.com/a/51391081/309561
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
