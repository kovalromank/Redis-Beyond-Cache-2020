import * as boom from '@hapi/boom';

// import { Response } from 'spotify-web-api-node';

import { redis, spotify } from '../utils';
import validateUser from '../helpers/validate-spotify-user';
import { USER_SERVICE_GET } from '../constants/redis';

export const get = async (sessionKey: string): Promise<UserServiceResponse> => {
  const data = await redis.get(sessionKey);

  if (!data) throw boom.unauthorized();

  const session: RedisSpotifySession = JSON.parse(data);

  const cache = await redis.get(USER_SERVICE_GET + session.user.id);

  if (cache) return JSON.parse(cache);

  const { authorized } = await validateUser(sessionKey, session);

  if (!authorized) throw boom.unauthorized();

  spotify.setAccessToken(session.accessToken);
  const promises: any = [
    spotify.getUserPlaylists(),
    spotify.getMyTopArtists(),
    spotify.getMyTopTracks(),
  ];

  const [resP, resA, resT]: any = await Promise.all(promises);
  const playlists: SpotifyApi.ListOfUsersPlaylistsResponse = resP.body;
  const artists: SpotifyApi.UsersTopArtistsResponse = resA.body;
  const tracks: SpotifyApi.UsersTopTracksResponse = resT.body;

  // Only return one image

  playlists.items.forEach((playlist) => {
    // eslint-disable-next-line no-param-reassign
    if (playlist.images.length) playlist.images = [playlist.images[0]];
  });

  artists.items.forEach((artist) => {
    // eslint-disable-next-line no-param-reassign
    if (artist.images.length) artist.images = [artist.images[0]];
  });

  tracks.items.forEach((track) => {
    // eslint-disable-next-line no-param-reassign
    if (track.album.images.length) track.album.images = [track.album.images[0]];
    // eslint-disable-next-line no-param-reassign
    delete track.available_markets;
    // eslint-disable-next-line no-param-reassign
    delete track.album.available_markets;
  });

  const response = { playlists: playlists.items, artists: artists.items, tracks: tracks.items };

  await redis.set(USER_SERVICE_GET + session.user.id, JSON.stringify(response), 'EX', 3600);

  return response;
  // return ({ playlists, artists, tracks } as any) as UserResponse;
};
