import config from 'config';
import mongoose from 'mongoose';
import CustomError from '@/utils/customError';
import logger from '@/utils/logger';

const connectToDB = async () => {
  try {
    const dbUrl: string = config.get('db.url');
    if (typeof dbUrl !== 'string' || dbUrl === undefined || dbUrl === '') {
      throw new CustomError('Database Connection url is not found', 500);
    }

    await mongoose.connect(dbUrl);
    logger.info('Database Connected Successfully!');
  } catch (error: unknown) {
    if (error instanceof CustomError || error instanceof Error)
      logger.error('Error connecting to Database', error.message);
    throw error;
  }
};

export default connectToDB;
