import 'dotenv/config';

export const { PORT, NODE_ENV, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

export const _prod = NODE_ENV === 'production';

export const mongoPort = process.env.MONGO_DB_PORT || 27017;

export const mongoDbConnectionString =
  process.env.NODE_ENV === 'development'
    ? `mongodb://localhost:${mongoPort}`
    : ``;
