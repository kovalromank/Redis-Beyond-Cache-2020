import { Handler } from 'express';

import { SpotifyAuthCodeCBQuery } from '../types/Spotify.d';
import env from '../env';
import { log } from '../utils';
import * as LoginService from '../services/LoginService';

const SPOTIFY_REDIRECT_URL = encodeURIComponent(env.SPOTIFY_CLIENT_REDIRECT);
const SPOTIFY_SCOPES = encodeURIComponent(
  [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-read-private',
    'user-library-read',
    'user-read-playback-position',
  ].join(' ')
);

export const loginSpotify: Handler = (req, res) => {
  // await initLoginSpotify()
  // TODO: Use state
  const href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URL}&scope=${SPOTIFY_SCOPES}`;
  res.redirect(href);
};

export const loginSpotifyComplete: Handler = async (req, res) => {
  const { code, state, error } = req.query as SpotifyAuthCodeCBQuery;

  let loginError;
  let loginResponse;
  try {
    [loginError, loginResponse] = await LoginService.loginSpotifyService(code, state, error);
  } catch (_error) {
    log.error(_error, 'controllers/login uncaught at loginSpotify', { query: req.query });
    res.redirect(`${env.WEB_URL}?error=${encodeURIComponent('Server error')}&code=500`);
    return;
  }

  if (loginError) {
    res.redirect(
      `${env.WEB_URL}?error=${encodeURIComponent(loginError.message)}&code=${loginError.code}`
    );
    return;
  }

  // TODO: This is probably really stupid
  res.redirect(`${env.WEB_URL}?data=${encodeURIComponent(JSON.stringify(loginResponse))}&code=200`);
};
