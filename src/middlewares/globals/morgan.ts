import logger from '@/utils/logger';
import morgan from 'morgan';
import {  Request,  } from 'express';

morgan.token('id', (req : Request) => req.id);

const morganFormat = ':id :method :url :status :response-time ms';

export const requestLogger = () => morgan(morganFormat, {
  stream: {
    write: (message) => {
      const [id, method, url, status, responseTime] = message.split(' ');

      const logObject = {
        id,
        method,
        url,
        status,
        responseTime,
      };

      logger.info(JSON.stringify(logObject));
    },
  },
});