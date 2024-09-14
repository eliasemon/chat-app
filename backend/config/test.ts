import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Load environment variables from the back-end workspace .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
  port: 4000,
  mode: 'test',
  db: {
    url: `${process.env.DATABASE_URL}`,
  },
};

export default config;
