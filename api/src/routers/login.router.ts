import * as express from 'express';
import { validate } from 'express-validation';

import * as LoginController from '../controllers/login.controller';
import * as LoginValidator from '../validators/login.validator';
import { asyncMiddleware } from '../middlewares/async.middleware';

const router = express.Router();

router.get('/spotify', asyncMiddleware(LoginController.loginSpotify));

router.get(
  '/spotify/complete',
  validate(LoginValidator.loginSpotifyComplete),
  asyncMiddleware(LoginController.loginSpotifyComplete)
);

export default router;
