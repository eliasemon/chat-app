import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error: CustomError = new Error('404 Not Found');
  error.status = 404;
  next(error);
};

export default notFoundHandler;
