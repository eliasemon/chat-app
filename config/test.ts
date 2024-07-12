import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: 4000,
  mode: 'test',
  db: {
    url: `${process.env.TEST_DATABASE_URL}`,
  },
};

export default config;
