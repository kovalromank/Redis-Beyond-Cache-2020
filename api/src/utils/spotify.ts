import env from '../env';

import SpotifyWebAPI = require('spotify-web-api-node');

const spotifyAPI = new SpotifyWebAPI({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET,
  redirectUri: env.SPOTIFY_CLIENT_REDIRECT,
});

export default spotifyAPI;
