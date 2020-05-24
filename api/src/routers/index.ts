import * as express from 'express';

import LoginRouter from './login.router';
import LogoutRouter from './logout.router';
import UserRouter from './user.router';

const router = express.Router();

router.use('/login', LoginRouter);
router.use('/logout', LogoutRouter);
router.use('/user', UserRouter);

export default router;
