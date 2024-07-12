import dotenv from 'dotenv';
import http from 'http';
import config from 'config';
import  app, { initializeRoute } from '@/app';
import logger from '@/utils/logger';


const server: http.Server = http.createServer(app);
dotenv.config();
const PORT = config.get('port') || 4000;

(BigInt.prototype as any).toJSON = function () {
	return this.toString();
};

async function startServer() {
  try {
    await initializeRoute();
    server.listen(PORT, () => {
      logger.info(`Server is listening on http://localhost:${PORT}`);
    });

    return { server };
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// startServer();

export default startServer();