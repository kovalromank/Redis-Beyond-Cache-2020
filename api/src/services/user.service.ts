import * as boom from '@hapi/boom';

// import { Response } from 'spotify-web-api-node';

import { spotify } from '../utils';
import { verify, filter } from '../helpers/spotify';
import { cache } from '../helpers/redis';
import { USER_SERVICE_GET } from '../constants/redis';

export const get = async (sessionKey: string): Promise<UserServiceResponse> => {
  const { authorized, session } = await verify(sessionKey);

  if (!authorized) throw boom.unauthorized();

  const data = await cache.get<UserServiceResponse>(USER_SERVICE_GET + session.user.id);
  if (data) return data;

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

  playlists.items.forEach((playlist) => filter.playlist(playlist));

  artists.items.forEach((artist) => filter.artist(artist));

  tracks.items.forEach((track) => filter.track(track));

  const response = { playlists: playlists.items, artists: artists.items, tracks: tracks.items };

  await cache.set(USER_SERVICE_GET + session.user.id, JSON.stringify(response));

  return response;
};
