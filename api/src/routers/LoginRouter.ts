import * as express from 'express';

import * as LoginController from '../controllers/LoginController';

const router = express.Router();

router.get('/spotify', LoginController.loginSpotify);

router.get('/spotify/complete', LoginController.loginSpotifyComplete);

export default router;
