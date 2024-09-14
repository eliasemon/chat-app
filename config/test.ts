import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: 4000,
  mode: 'test',
  db: {
    url: `${process.env.DATABASE_URL_POSTGRES}`,
  },
};

export default config;
