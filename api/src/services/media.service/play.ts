import * as boom from '@hapi/boom';

import { spotify, redis } from '../../utils';
import { verify, parseURI } from '../../helpers/spotify';
import {
  PlayResponse,
  getResponse,
  getTrack,
  saveResponse,
  startPlayback,
  getYoutube,
  WEEK,
} from './shared';
import { MEDIA_TRACK } from '../../constants/redis';

const play = async (sessionKey: string, spotifyURI: string): Promise<PlayResponse> => {
  const resource = parseURI(spotifyURI);
  if (!resource) throw boom.badRequest();

  const { authorized, session } = await verify(sessionKey);

  if (!authorized) throw boom.unauthorized();
  spotify.setAccessToken(session.accessToken);

  // const { body: playbackstate } = await spotify.getMyCurrentPlaybackState({ market: 'from_token' });
  // log.info(playbackstate.);

  const cacheResponse = await getResponse(resource);

  if (cacheResponse) {
    if (cacheResponse.error) return cacheResponse;
    if (!cacheResponse.media?.track.uri) return { error: 'track_not_found' };
    const { error } = await startPlayback(resource, cacheResponse);
    if (error) return { error };
    session.current = { uri: cacheResponse.media.track.uri };
    redis.set(sessionKey, JSON.stringify(session), 'EX', 3600);
    return cacheResponse;
  }

  const { volatile, error: trackError, tracks } = await getTrack(resource);

  if (!tracks.length || trackError) {
    const resTracks: PlayResponse = { error: 'track_not_found' };
    await saveResponse(resource, resTracks, volatile);
    return resTracks;
  }

  const track = tracks[0];
  const response = { media: { track } } as PlayResponse;

  const promises: Promise<void>[] = [];
  const pipe = redis.pipeline();

  if (tracks.length > 1) {
    session.queue = tracks.slice(1, 20).map((t) => {
      let duplicate = false;
      promises.push(
        Promise.resolve()
          .then(() => {
            return redis.get(MEDIA_TRACK + t.uri);
          })
          .then((val) => {
            if (val) duplicate = true;
          })
          .then(() => {
            if (duplicate) return null;
            return getYoutube(t);
          })
          .then((res) => {
            if (duplicate) return;
            const r: PlayResponse = { media: { track: t, youtube: { id: '' } } };
            if (res.error) response.error = res.error;
            else r.media.youtube = res.youtube;
            pipe.set(MEDIA_TRACK + resource.uri, JSON.stringify(r), 'EX', WEEK);
          })
      );

      return { uri: t.uri };
    });
  }

  await Promise.all(promises);

  const youtubeRes = await getYoutube(track);

  if (youtubeRes.error) {
    response.error = youtubeRes.error;
    await saveResponse(resource, response, volatile);
    return { error: youtubeRes.error };
  }

  response.media.youtube = youtubeRes.youtube;

  await saveResponse(resource, response, volatile);

  if (!response.media.track?.uri) {
    throw boom.notFound();
  }

  // Just in case
  if (response.error) {
    return { error: response.error };
  }

  const { error } = await startPlayback(resource, response);
  if (error) return { error };
  session.current = { uri: response.media.track.uri };
  await pipe.set(sessionKey, JSON.stringify(session), 'EX', 3600).exec();

  return response;
};

export default play;
