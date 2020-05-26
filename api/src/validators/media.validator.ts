import { Joi, schema } from 'express-validation';

export const play: schema = {
  query: Joi.object({
    session: Joi.string().required(),
    spotify_uri: Joi.string().required(),
  }),
};

export const pause: schema = {
  query: Joi.object({
    session: Joi.string().required(),
  }),
};
