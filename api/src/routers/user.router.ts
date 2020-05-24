import * as express from 'express';
import { validate } from 'express-validation';

import * as UserController from '../controllers/user.controller';
import * as UserValidator from '../validators/user.validator';
import { asyncMiddleware } from '../middlewares/async.middleware';

const router = express.Router();

router.get('/', validate(UserValidator.get), asyncMiddleware(UserController.get));

export default router;
