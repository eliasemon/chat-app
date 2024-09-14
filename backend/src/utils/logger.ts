import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      level: 'info',
      format: format.json(),
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      level: 'error',
      format: format.json(),
    }),
    new winston.transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf((info) => {
          const { level, message, timestamp } = info;
          return `[${timestamp}] ${level}: ${message}`;
        }),
      ),
    }),
  ],
});

export default logger;
