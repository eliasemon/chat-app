import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { requestLogger } from '@/middlewares/globals/morgan';
import { generateRequestId } from '@/middlewares/globals/rqIdGenerator';
import errorHandler from '@/middlewares/globals/errorHandler';
import notFoundHandler from '@/middlewares/globals/notFoundHandler';
import logger from '@/utils/logger';
import { addRoutesFromFolders } from '@/utils/addRoutesFromFolders';

// Express Application
const app: Application = express();

// Body Parser
app.use(express.json());

app.use(cookieParser());

// cors
app.use(cors());

// add the id to the request
app.use(generateRequestId);

// request response logger middleware
app.use(requestLogger());

// Static Serve
app.use(express.static(path.join(__dirname, '../public')));

export async function initializeRoute() {
  const router = express.Router();
  try {
    await addRoutesFromFolders(router, './api');
    app.use('/api', router);
  } catch (error) {
    logger.error('Error adding routes:', error);
    throw error;
  }
  // NotFound Handler
  app.use(notFoundHandler);

  // errorHandler
  app.use(errorHandler);
}

export default app;
