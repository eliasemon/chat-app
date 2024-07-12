import logger from '@/utils/logger';
import { Request, Response, NextFunction } from 'express';


interface CustomError extends Error {
  status?: number;
}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction): void => {
  logger.error('Error:', error);

  if (error.status) {
    res.status(error.status).send(error.message);
  } else {
    res.status(500).send('Something went wrong');
  }

  next(error);
};

export default errorHandler;
