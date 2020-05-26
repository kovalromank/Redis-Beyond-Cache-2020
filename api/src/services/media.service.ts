import * as boom from '@hapi/boom';

import { MEDIA_SERVICE_PLAY } from '../constants/redis';

import { spotify } from '../utils';
import { verify, parseURI, filter } from '../helpers/spotify';
import { cache } from '../helpers/redis';

export const play = async (
  sessionKey: string,
  spotifyURI: string
): Promise<SpotifyApi.TrackObjectFull> => {
  const resource = parseURI(spotifyURI);
  if (!resource) throw boom.badRequest();

  const { authorized, session } = await verify(sessionKey);

  if (!authorized) throw boom.unauthorized();

  spotify.setAccessToken(session.accessToken);

  if (resource.type === 'track') await spotify.play({ uris: [resource.uri] });
  else await spotify.play({ context_uri: resource.uri });

  const data = await cache.get<SpotifyApi.TrackObjectFull>(MEDIA_SERVICE_PLAY + resource.uri);
  if (data) return data;

  let response: SpotifyApi.TrackObjectFull;
  let volatile = false;

  switch (resource.type) {
    case 'track': {
      const { body } = await spotify.getTrack(resource.id, { market: 'from_token' });
      response = body;
      filter.track(response);
      await spotify.play({ uris: [resource.uri] });
      break;
    }
    case 'album': {
      const { body } = await spotify.getAlbum(resource.id, { market: 'from_token' });
      response = {
        ...body.tracks.items[0],
        album: body,
        external_ids: body.external_ids,
        popularity: body.popularity,
      };
      filter.track(response);
      break;
    }
    case 'artist': {
      const { body } = await spotify.getArtistTopTracks(resource.id, 'from_token');
      [response] = body.tracks;
      filter.track(response);
      break;
    }
    default: {
      volatile = true;
      const { body } = await spotify.getPlaylist(resource.id, { market: 'from_token' });
      let track: SpotifyApi.TrackObjectFull;
      for (let i = 0; i < body.tracks.items.length; i++) {
        if (body.tracks.items[i].track) track = body.tracks.items[i].track;
      }
      response = track;
      if (track) {
        filter.track(response);
      }
    }
  }

  await cache.set(
    MEDIA_SERVICE_PLAY + resource.uri,
    JSON.stringify(response),
    volatile ? 3600 : 24 * 3600
  );

  return response;
};

export const pause = async (sessionKey: string) => {
  const { authorized, session } = await verify(sessionKey);
  if (!authorized) throw boom.unauthorized();
  spotify.setAccessToken(session.accessToken);
  await spotify.pause();
};
