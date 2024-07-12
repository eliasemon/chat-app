import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: 3000,
  mode: 'development',
  db: {
    url: `${process.env.DATABASE_URL}`,
  },
};

export default config;
