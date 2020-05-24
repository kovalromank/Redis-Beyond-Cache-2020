import { Handler } from 'express';
import * as boom from '@hapi/boom';

export const asyncMiddleware = (fn: Handler): Handler => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (!err.isBoom) return next(boom.badImplementation(err));
    return next(err);
  });
