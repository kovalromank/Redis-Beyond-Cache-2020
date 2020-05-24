import * as Redis from 'ioredis';

import env from '../env';

const redis = new Redis({
  port: env.REDIS_PORT,
  host: env.REDIS_HOST,
  db: env.REDIS_DB,
  password: env.REDIS_PASSWORD,
  family: env.REDIS_FAMILY,
});

export default redis;
