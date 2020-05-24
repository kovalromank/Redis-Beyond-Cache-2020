import * as express from 'express';
import { validate } from 'express-validation';

import * as LogoutController from '../controllers/logout.controller';
import * as LogoutValidator from '../validators/logout.validator';
import { asyncMiddleware } from '../middlewares/async.middleware';

const router = express.Router();

router.get('/', validate(LogoutValidator.logout), asyncMiddleware(LogoutController.logout));

export default router;
