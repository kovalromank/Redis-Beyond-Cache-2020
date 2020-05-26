import { Handler } from 'express';
import * as boom from '@hapi/boom';

import env from '../env';
import * as LoginService from '../services/login.service';

export const loginSpotify: Handler = async (req, res, next) => {
  let url;
  try {
    url = await LoginService.loginSpotify();
  } catch (err) {
    if (boom.isBoom(err))
      res.redirect(
        `${env.WEB_URL}?error=${encodeURIComponent(err.message)}&code=${err.output.statusCode}`
      );
    else res.redirect(`${env.WEB_URL}?error=${encodeURIComponent('Server error')}&code=500`);

    next(err);
    return;
  }

  res.redirect(url);
};

type LoginCompleteQuery = {
  code?: string;
  error?: string;
  state?: string;
};

export const loginSpotifyComplete: Handler = async (req, res, next) => {
  const { code, state, error } = req.query as LoginCompleteQuery;

  let loginResponse;
  try {
    loginResponse = await LoginService.loginSpotifyComplete(code, error, state);
  } catch (err) {
    if (boom.isBoom(err))
      res.redirect(
        `${env.WEB_URL}?error=${encodeURIComponent(err.message)}&code=${err.output.statusCode}`
      );
    else res.redirect(`${env.WEB_URL}?error=${encodeURIComponent('Server error')}&code=500`);

    next(err);
    return;
  }

  // TODO: This is probably really stupid
  res.redirect(`${env.WEB_URL}?data=${encodeURIComponent(JSON.stringify(loginResponse))}&code=200`);
};
