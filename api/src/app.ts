import * as path from 'path';

import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as cors from 'cors';
import * as nocache from 'nocache';

import Routers from './routers';

import {
  errorDecorator,
  finalErrorHandler,
  notFoundErrorHandler,
  unhandledRejectionHandler,
  uncaughtExceptionHandler,
} from './middlewares/error.middleware';

const app = express();

app.set('env', process.env.NODE_ENV);

app.set('trust proxy', true);

app.use(favicon(path.join('.', 'public', 'favicon-32x32.png')));

app.use(nocache());

app.use(cors());

app.use('/api', Routers);

app.use(notFoundErrorHandler);

process.on('unhandledRejection', unhandledRejectionHandler);

process.on('uncaughtException', uncaughtExceptionHandler);

app.use(errorDecorator);

app.use(finalErrorHandler);

export default app;
