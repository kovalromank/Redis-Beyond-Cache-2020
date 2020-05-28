import { Handler } from 'express';

import * as MediaService from '../services/media.service';
import { log } from '../utils';

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

type UpdateQuery = AuthenticatedQuery;

export const update: Handler = async (req, res, next) => {
  const { session } = req.query as UpdateQuery;
  try {
    const data = await MediaService.update(session);
    res.json(data);
  } catch (error) {
    log.info(error);
    throw error;
  }
};
