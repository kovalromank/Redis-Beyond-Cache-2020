import { Joi, schema } from 'express-validation';

export const logout: schema = {
  query: Joi.object({
    session: Joi.string().required(),
  }),
};
