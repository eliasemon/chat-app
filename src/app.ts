import { requestLogger } from '@/middlewares/globals/morgan';
import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import { generateRequestId } from '@/middlewares/globals/rqIdGenerator';
import errorHandler from './middlewares/globals/errorHandler';
import notFoundHandler from './middlewares/globals/notFoundHandler';
import logger from './utils/logger';
import { addRoutesFromFolders } from './utils/addRoutesFromFolders';



// Express Application
const app: Application = express();

// Body Parser
app.use(express.json());

// cors
app.use(cors());

// add the id to the request
app.use(generateRequestId)

// request response logger middleware
app.use(requestLogger());

// Static Serve
app.use(express.static(path.join(__dirname, '../../src/public')));

export async function initializeRoute() {
  const router = express.Router()
  try {
    await addRoutesFromFolders(router, './api');
    app.use("/api" , router)
  } catch (error) {
    logger.error('Error adding routes:', error);
  }
  // NotFound Handler
  app.use(notFoundHandler);

  // errorHandler
  app.use(errorHandler);
}
export default app;