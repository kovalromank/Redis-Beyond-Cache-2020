import { redis } from '../../utils';

export const get = async <T>(key: string): Promise<T> => {
  const data = await redis.get(key);
  if (data) return JSON.parse(data);
  return null;
};

export const set = async (key: string, value: string, ex = 3600) => {
  await redis.set(key, value, 'EX', ex);
};
