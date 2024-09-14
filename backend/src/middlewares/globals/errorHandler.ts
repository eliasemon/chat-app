import { Request, Response } from 'express';
import { ICustomError } from '@/types';
import logger from '@/utils/logger';

const errorHandler = (
  error: ICustomError,
  _req: Request,
  res: Response,
): void => {
  logger.error('Error:', error);

  if (error.status) {
    res
      .status(error.status)
      .json({ status: error.status, message: error.message });
  } else {
    res.status(500).send('Internal Server Error');
  }
};

export default errorHandler;
