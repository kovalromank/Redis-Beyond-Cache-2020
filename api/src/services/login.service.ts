import { v4 as uuidv4 } from 'uuid';
import * as boom from '@hapi/boom';

import { redis, spotify } from '../utils';

const SPOTIFY_SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'user-library-read',
  'user-read-playback-position',
  'user-top-read',
];

export const loginSpotify = async (): Promise<string> => {
  const state = uuidv4();

  // Expire after an hour
  await redis.set(state, '{}', 'EX', 3600);

  return spotify.createAuthorizeURL(SPOTIFY_SCOPES, state);
};

type LoginSpotifyCompleteResponse = {
  session: string;
  name: string;
  id: string;
  uri: string;
  image?: {
    width?: number;
    height?: number;
    url: string;
  };
};

export const loginSpotifyComplete = async (
  code?: string,
  error?: string,
  state?: string
): Promise<LoginSpotifyCompleteResponse> => {
  if (error || !code) throw boom.badRequest('Invalid parameters');

  const delKeys = await redis.del(state);

  // Only a session that was created with loginSpotify allowed
  if (delKeys === 0) throw boom.unauthorized();

  const { body: tokens } = await spotify.authorizationCodeGrant(code);

  spotify.setAccessToken(tokens.access_token);
  const { body: user } = await spotify.getMe();

  if (user.images?.length) user.images = [user.images[0]];

  const session = uuidv4();

  const response: RedisSpotifySession = {
    user,
    accessToken: tokens.access_token,
    tokenType: tokens.token_type,
    scope: tokens.scope,
    expiresIn: tokens.expires_in + Date.now() / 1000,
    refreshToken: tokens.refresh_token,
    queue: [],
  };

  await redis.set(session, JSON.stringify(response), 'EX', 24 * 3600);

  const returns: LoginSpotifyCompleteResponse = {
    session,
    id: user.id,
    name: user.display_name,
    uri: user.uri,
  };

  if (user.images?.length) [returns.image] = user.images;

  return returns;
};
