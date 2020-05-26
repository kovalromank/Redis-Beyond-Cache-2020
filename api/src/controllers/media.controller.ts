import { Handler } from 'express';

import * as MediaService from '../services/media.service';

// eslint-disable-next-line camelcase
type PlayQuery = AuthenticatedQuery & { spotify_uri: string };

export const play: Handler = async (req, res, next) => {
  const { session, spotify_uri: spotifyURI } = req.query as PlayQuery;

  const data = await MediaService.play(session, spotifyURI);

  res.json(data);
};

type PauseQuery = AuthenticatedQuery;

export const pause: Handler = async (req, res, next) => {
  const { session } = req.query as PauseQuery;
  await MediaService.pause(session);
  res.sendStatus(204);
};
