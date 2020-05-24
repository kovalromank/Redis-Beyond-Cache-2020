import { Joi, schema } from 'express-validation';

export const loginSpotifyComplete: schema = {
  query: Joi.object({
    code: Joi.string(),
    error: Joi.string(),
    state: Joi.string().required(),
  }),
};
