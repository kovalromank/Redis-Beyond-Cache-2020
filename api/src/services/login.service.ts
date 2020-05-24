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

export const loginSpotifyComplete = async (
  code?: string,
  error?: string,
  state?: string
): Promise<LoginSpotifyCompleteServiceResponse> => {
  if (error || !code) throw boom.badRequest('Invalid parameters');

  const delKeys = await redis.del(state);

  // Only a session that was created with loginSpotify allowed
  if (delKeys === 0) throw boom.unauthorized();

  // const request = {
  //   grant_type: 'authorization_code',
  //   code,
  //   redirect_uri: spotify.getRedirectURI(),
  //   client_id: spotify.getClientId(),
  //   client_secret: spotify.getClientSecret(),
  // };

  // const { data } = await axios.spotify({
  //   method: 'POST',
  //   url: 'https://accounts.spotify.com/api/token',
  //   data: qs.stringify(request),
  // });
  // const tokens = data;
  const { body: tokens } = await spotify.authorizationCodeGrant(code);

  // const requestBody = {
  //   grant_type: 'authorization_code',
  //   code,
  //   redirect_uri: env.SPOTIFY_CLIENT_REDIRECT,
  //   client_id: env.SPOTIFY_CLIENT_ID,
  //   client_secret: env.SPOTIFY_CLIENT_SECRET,
  // };

  // const { data } = await axios.spotify({
  //   method: 'POST',
  //   url: 'https://accounts.spotify.com/api/token',
  //   data: qs.stringify(requestBody),
  // });
  // tokens = data;
  // log.error(tokensError, 'services/login failed at getting client tokens %o', {
  //   tokens,
  //   params: { code, error, state },
  // });
  // throw boom.boomify(err, {
  //   message: 'Authorization error',
  //   data: { tokens, params: { code, error, state } },
  // });

  // if (!tokens.access_token)
  //   throw boom.badImplementation('Authorization error', { tokens, params: { code, error, state } });

  spotify.setAccessToken(tokens.access_token);
  const { body: user } = await spotify.getMe();

  // Only store the first image
  if (user.images?.length) user.images = [user.images[0]];

  // let user: SpotifyPrivateUser;
  // try {
  //   const { data } = await axios.spotify({
  //     method: 'GET',
  //     url: '/me',
  //     headers: { Authorization: `Bearer ${tokens.access_token}` },
  //   });
  //   user = data;
  // } catch (err) {
  // log.error(userError, 'services/login failed at user info %o', {
  //   tokens,
  //   user,
  //   params: { code, error, state },
  // });
  //   throw boom.boomify(err, {
  //     message: 'User info error',
  //     data: { tokens, user, params: { code, error, state } },
  //   });
  // }

  const session = uuidv4();

  const response: RedisSpotifySession = {
    user,
    accessToken: tokens.access_token,
    tokenType: tokens.token_type,
    scope: tokens.scope,
    expiresIn: tokens.expires_in + Date.now() / 1000,
    refreshToken: tokens.refresh_token,
  };

  await redis.set(session, JSON.stringify(response), 'EX', 24 * 3600);

  const returns: LoginSpotifyCompleteServiceResponse = {
    session,
    id: user.id,
    name: user.display_name,
    uri: user.uri,
  };

  if (user.images?.length) [returns.image] = user.images;

  return returns;
};
