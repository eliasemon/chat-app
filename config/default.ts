import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  mode: 'development',
  db: {
    url: `${process.env.DATABASE_URL_POSTGRES}`,
  },
};

export default config;
