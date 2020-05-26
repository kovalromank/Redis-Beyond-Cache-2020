import * as express from 'express';

import LoginRouter from './login.router';
import LogoutRouter from './logout.router';
import UserRouter from './user.router';
import MediaRouter from './media.router';

const router = express.Router();

router.use('/login', LoginRouter);
router.use('/logout', LogoutRouter);
router.use('/user', UserRouter);
router.use('/media', MediaRouter);

export default router;
