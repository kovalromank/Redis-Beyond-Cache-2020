import { redis } from '../../utils';

export const get = async <T>(key: string): Promise<T> => {
  const data = await redis.get(key);
  if (data) return JSON.parse(data);
  return null;
};

export const set = async <T>(key: string, value: T, ex = 3600) => {
  if (typeof value === 'string') await redis.set(key, value, 'EX', ex);
  else await redis.set(key, JSON.stringify(value), 'EX', ex);
};
