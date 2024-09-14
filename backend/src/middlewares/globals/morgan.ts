import morgan from 'morgan';
import { Request } from 'express';
import logger from '@/utils/logger';

morgan.token('id', (req: Request) => req.id);
morgan.token('ip', (req: Request) => req.ip);

const morganFormat = ':id :ip :method :url :status :response-time ms';

export const requestLogger = () =>
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        // console.log(message);
        const [id, ip, method, url, status, responseTime] = message.split(' ');

        const logObject = {
          id,
          ip,
          method,
          url,
          status,
          responseTime,
        };

        logger.info(JSON.stringify(logObject));
      },
    },
  });
