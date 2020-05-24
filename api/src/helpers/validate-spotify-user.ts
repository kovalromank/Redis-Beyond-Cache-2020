/* eslint-disable no-param-reassign */
import { spotify, redis } from '../utils';

type VerifyUserResponse = {
  authorized: boolean;
};

const verifyUser = async (
  sessionKey: string,
  session: RedisSpotifySession
): Promise<VerifyUserResponse> => {
  if (session.expiresIn + 10 < Date.now() / 1000) {
    if (session.refreshToken) {
      spotify.setRefreshToken(session.refreshToken);
      const { body: tokens } = await spotify.refreshAccessToken();

      // user.scope = tokens.scope;
      session.accessToken = tokens.access_token;
      session.expiresIn = tokens.expires_in + Date.now() / 1000;
      delete session.refreshToken;
      await redis.set(sessionKey, JSON.stringify(session), 'EX', 24 * 3600);
    } else {
      await redis.del(sessionKey);
      return { authorized: false };
    }
  } else {
    await redis.expire(sessionKey, 24 * 3600);
  }

  return { authorized: true };
};

export default verifyUser;
