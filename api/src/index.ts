import 'dotenv-flow/config';

import * as express from 'express';

import { log } from './utils';
import app from './app';

const server = express();

server.use(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => log.info(`🚀 server started at http://localhost:${PORT}`));
