import { Joi, schema } from 'express-validation';

export const get: schema = {
  query: Joi.object({
    session: Joi.string().required(),
  }),
};
