import * as express from 'express';

import LoginRouter from './LoginRouter';

const router = express.Router();

router.use('/login', LoginRouter);

export default router;
