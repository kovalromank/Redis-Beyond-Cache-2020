const env = {
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CLIENT_REDIRECT: process.env.SPOTIFY_CLIENT_REDIRECT,
  WEB_URL: process.env.WEB_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: Number.parseInt(process.env.REDIS_DB, 10),
  REDIS_PORT: Number.parseInt(process.env.REDIS_PORT, 10),
  REDIS_FAMILY: Number.parseInt(process.env.REDIS_FAMILY, 10),
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
};

let failed = '';
Object.entries(env).forEach(([key, value]) => {
  if (value == null) failed += `, ${key}`;
});
if (failed.length) throw new Error(`Missing required environment variables: ${failed.substr(2)}`);

export default env;
