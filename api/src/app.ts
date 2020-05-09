import * as express from 'express';

import Routers from './routers';

const router = express.Router();

router.use('/v1', Routers);

export default router;
