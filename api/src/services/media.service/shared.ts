import { MEDIA_CONTEXT, MEDIA_TRACK } from '../../constants/redis';

import { spotify, youtube, redis, log } from '../../utils';
import { filter } from '../../helpers/spotify';
import { ParseURIResponse } from '../../helpers/spotify/parse-uri';
import { cache } from '../../helpers/redis';

export type PlayResponse = {
  media?: {
    track: SpotifyApi.TrackObjectFull;
    youtube: {
      id: string;
    };
  };
  error?: 'device_not_found' | 'track_not_found' | 'youtube_not_found';
};

export type UpdateResponse = {
  media?: PlayResponse['media'];
  error?: 'device_not_found' | 'track_not_found' | 'youtube_not_found';
  empty?: boolean;
};

export type PlaybackResponse = { error?: PlayResponse['error'] };

export type ContextCache = { uri?: string; error?: PlayResponse['error'] };

export const getResponse = async (resource: ParseURIResponse): Promise<PlayResponse> => {
  if (resource.type === 'track') {
    const data = await cache.get<PlayResponse>(MEDIA_TRACK + resource.uri);
    if (data) return data;
  } else {
    const context = await cache.get<ContextCache>(MEDIA_CONTEXT + resource.uri);
    if (context) {
      if (context.error) return { error: context.error };
      if (context.uri) {
        const data = await cache.get<PlayResponse>(MEDIA_TRACK + context.uri);
        if (data) return data;
      }

      await redis.del(MEDIA_CONTEXT + resource.uri); // Should never happen
    }
  }
  return null;
};

export const WEEK = 7 * 24 * 3600;

export const saveResponse = async (
  resource: ParseURIResponse,
  response: PlayResponse,
  volatile: boolean
) => {
  if (resource.type === 'track') {
    await cache.set<PlayResponse>(MEDIA_TRACK + resource.uri, response, WEEK);
    return;
  }

  if (response.media?.track?.uri) {
    const data: ContextCache = { uri: response.media.track.uri };
    if (response.error) data.error = response.error;

    await cache.set<ContextCache>(MEDIA_CONTEXT + resource.uri, data, volatile ? 3600 : WEEK);
    await cache.set<PlayResponse>(MEDIA_TRACK + response.media.track.uri, response, WEEK);
    return;
  }

  const data: ContextCache = {};
  if (response.error) data.error = response.error;
  await cache.set<ContextCache>(MEDIA_CONTEXT + resource.uri, data, volatile ? 3600 : WEEK);
};

/**
 * If applicable, response must have a valid track uri
 */
export const startPlayback = async (
  resource: ParseURIResponse,
  response: PlayResponse
): Promise<PlaybackResponse> => {
  let options;

  if (resource.type === 'album' || resource.type === 'playlist') {
    options = { context_uri: resource.uri, offset: { uri: response.media.track.uri } };
  } else if (resource.type === 'artist') {
    options = { context_uri: resource.uri };
  } else {
    options = { uris: [resource.uri] };
  }

  try {
    await spotify.play(options);
  } catch (error) {
    if (error.name === 'WebapiError' && error.statusCode === 404) {
      return { error: 'device_not_found' };
    }
    throw error;
  }
  return {};
};

type GetTrackResponse = {
  volatile: boolean;
  tracks?: SpotifyApi.TrackObjectFull[];
  error?: 'track_not_found';
};

export const getTrack = async (resource: ParseURIResponse): Promise<GetTrackResponse> => {
  try {
    const response: GetTrackResponse = { volatile: false };
    switch (resource.type) {
      case 'track': {
        const { body } = await spotify.getTrack(resource.id, { market: 'from_token' });
        response.tracks = [body];
        break;
      }
      case 'album': {
        const { body } = await spotify.getAlbum(resource.id, { market: 'from_token' });
        response.tracks = [];
        if (!body.tracks.items.length) break;
        body.tracks.items.forEach((track) => {
          response.tracks.push({
            ...track,
            album: body,
            external_ids: body.external_ids,
            popularity: body.popularity,
          });
        });
        break;
      }
      case 'artist': {
        const { body } = await spotify.getArtistTopTracks(resource.id, 'from_token');
        response.tracks = [];
        if (!body.tracks.length) break;
        body.tracks.forEach((track) => {
          response.tracks.push(track);
        });
        break;
      }
      default: {
        const { body } = await spotify.getPlaylist(resource.id, { market: 'from_token' });
        response.tracks = [];
        if (!body.tracks.items.length) break;

        body.tracks.items.forEach((playlistObj) => {
          if (playlistObj.track) response.tracks.push(playlistObj.track);
        });

        response.volatile = true;
      }
    }
    response.tracks.forEach((track) => {
      filter.track(track);
    });
    return response;
  } catch (error) {
    if (error.name === 'WebapiError' && error.statusCode !== 429) {
      log.error(error, 'Get track from resource error');
      return { volatile: false, error: 'track_not_found' };
    }
    log.error(error, 'Get track from resource error');
    throw error;
  }
};

type GetYoutubeResponse = {
  youtube?: { id: string };
  error?: 'youtube_not_found';
};

export const getYoutube = async (
  track: SpotifyApi.TrackObjectFull
): Promise<GetYoutubeResponse> => {
  let q = track.name;
  if (track.artists[0]?.name) q = `${track.artists[0].name} ${track.name}`;

  const {
    data: { items },
  } = await youtube.search.list({
    q,
    type: 'video',
    part: 'snippet',
    maxResults: 1,
  });

  if (!items.length) return { error: 'youtube_not_found' };

  return { youtube: { id: items[0].id.videoId } };
};
