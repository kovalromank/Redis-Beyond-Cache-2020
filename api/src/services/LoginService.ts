import * as qs from 'querystring';

import { SpotifyPrivateUser, SpotifyAuthCodeResponse } from '../types/Spotify.d';

import env from '../env';
import { log, axios } from '../utils';

type LoginSpotifyResponse = [
  {
    code: number;
    error: Error;
    spotify: boolean;
    message: string;
  } | null,
  {
    accessToken: string;
    tokenType: 'Bearer';
    scope: string;
    expiresIn: number;
    refreshToken: string;
    user: SpotifyPrivateUser;
  } | null
];

export const loginSpotifyService = async (
  code?: string,
  error?: string,
  state?: string
): Promise<LoginSpotifyResponse> => {
  // TODO: Do something with state

  if (error || !code)
    return Promise.resolve([
      {
        code: 400,
        error: new Error(error),
        spotify: true,
        message: 'Not logged in to Spotify',
      },
      null,
    ]);

  let tokens: SpotifyAuthCodeResponse;
  try {
    const requestBody = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: env.SPOTIFY_CLIENT_REDIRECT,
      client_id: env.SPOTIFY_CLIENT_ID,
      client_secret: env.SPOTIFY_CLIENT_SECRET,
    };

    const { data } = await axios.spotify({
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      data: qs.stringify(requestBody),
    });
    tokens = data;
  } catch (tokensError) {
    log.error(tokensError, 'services/login failed at getting client tokens %o', {
      tokens,
      params: { code, error, state },
    });
    return Promise.resolve([
      {
        code: 500,
        error: tokensError,
        spotify: false,
        message: "Couldn't login to Spotify, try again later",
      },
      null,
    ]);
  }

  if (!tokens.access_token)
    return Promise.resolve([
      {
        code: 500,
        error: new Error('Failed to login'),
        spotify: false,
        message: "Couldn't login to Spotify, try again later",
      },
      null,
    ]);

  let user: SpotifyPrivateUser;
  try {
    const { data } = await axios.spotify({
      method: 'GET',
      url: '/me',
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    user = data;
  } catch (userError) {
    log.error(userError, 'services/login failed at user info %o', {
      tokens,
      user,
      params: { code, error, state },
    });
    return Promise.resolve([
      {
        code: 500,
        error: userError,
        spotify: false,
        message: "Couldn't login to Spotify, try again later",
      },
      null,
    ]);
  }

  return Promise.resolve([
    null,
    {
      user,
      accessToken: tokens.access_token,
      tokenType: tokens.token_type,
      scope: tokens.scope,
      expiresIn: tokens.expires_in,
      refreshToken: tokens.refresh_token,
    },
  ]);
};
