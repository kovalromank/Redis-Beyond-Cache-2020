/*
 * Source: https://github.com/sandorTuranszky/production-ready-expressjs-server/blob/master/src/utils/errorMiddleware.js
 */

import { Handler, ErrorRequestHandler } from 'express';
import * as boom from '@hapi/boom';
import { ValidationError } from 'express-validation';

import { log } from '../utils';

const exitProcess = () => {
  process.exit(1);
};

export const notFoundErrorHandler: Handler = (req, res, next) => {
  return next(boom.notFound('Route not found'));
};

export const unhandledRejectionHandler = (reason: string, p: Promise<any>) => {
  log.error(p, 'Unhandled rejection at Promise %s', reason);
};

export const uncaughtExceptionHandler = (err: Error) => {
  log.error(err);
  exitProcess();
};

export const errorDecorator: ErrorRequestHandler = (err, req, res, next) => {
  const serverErrorWithStack = err.statusCode >= 500 && err.stack !== undefined;

  const nonBoomNoStatusCode = !err.isBoom && !err.statusCode;

  const options: any = {
    // statusCode: err instanceof ValidationError ? 400 : err.statusCode || 500,
    // Add more details
    decorate: {
      // Assign existing `isDeveloperError` if available
      isDeveloperError: err.isDeveloperError || serverErrorWithStack || nonBoomNoStatusCode,
      originalUrl: req.originalUrl,
      method: req.method,
      ip: req.ip,
    },
    // Add stack trace if available
    data: { ...err.data, stack: err.stack || '' },
  };

  if (err instanceof ValidationError) {
    // eslint-disable-next-line no-param-reassign
    err.message = 'Invalid input';
    options.statusCode = 400;
  } else if (err.name === 'WebapiError') {
    if (err.statusCode === 429) {
      options.statusCode = 400;
      // eslint-disable-next-line no-param-reassign
      err.message = 'Too many requests';
    } else {
      options.statusCode = 500;
      // eslint-disable-next-line no-param-reassign
      err.message = 'Server error';
    }
  }
  const originalMessage = err.message || null;

  boom.boomify(err, options);

  if (originalMessage && !nonBoomNoStatusCode) err.output.payload.message = originalMessage; // eslint-disable-line

  next(err);
};

// eslint-disable-next-line consistent-return
export const finalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') log.error({ error: err });
  else if (err.isServer) log.error({ error: err });

  if (res.headersSent) return next(err);

  // if (err.isDeveloperError) exitProcess();
  return res.status(err.output.statusCode).json(err.output.payload);
};
