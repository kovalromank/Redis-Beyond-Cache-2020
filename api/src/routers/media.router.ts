import * as express from 'express';
import { validate } from 'express-validation';

import * as MediaController from '../controllers/media.controller';
import * as MediaValidator from '../validators/media.validator';
import { asyncMiddleware } from '../middlewares/async.middleware';

const router = express.Router();

router.post('/play', validate(MediaValidator.play), asyncMiddleware(MediaController.play));
router.post('/pause', validate(MediaValidator.pause), asyncMiddleware(MediaController.pause));

export default router;
