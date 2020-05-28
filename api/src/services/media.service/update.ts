import * as boom from '@hapi/boom';

import { UpdateResponse, PlayResponse, getTrack, saveResponse, getYoutube } from './shared';
import { spotify, redis } from '../../utils';
import { verify, parseURI } from '../../helpers/spotify';
import { cache } from '../../helpers/redis';
import { MEDIA_TRACK } from '../../constants/redis';

const update = async (sessionKey: string): Promise<UpdateResponse> => {
  const { authorized, session } = await verify(sessionKey);
  if (!authorized) throw boom.unauthorized();
  spotify.setAccessToken(session.accessToken);

  // if (!session.queue.length) throw boom.notFound();

  const { body } = await spotify.getMyCurrentPlaybackState();

  if (!session.current?.uri && !body.is_playing) return {};

  if (!session.current?.uri && body.is_playing) {
    const { uri } = body.item;
    const resource = parseURI(uri);
    if (!resource) throw boom.notFound();
    const { volatile, error: trackError, tracks } = await getTrack(resource);
    if (!tracks.length || trackError) {
      const resTracks: PlayResponse = { error: 'track_not_found' };
      await saveResponse(resource, resTracks, volatile);
      return resTracks;
    }

    const track = tracks[0];
    const response = { media: { track } } as UpdateResponse;

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

    if (response.error) {
      return { error: response.error };
    }

    return response;
  }

  if (session.current.uri === body.item.uri) return {};

  const [item] = session.queue.splice(0, 1);
  if (!item) return { empty: true };
  const { uri } = item;
  session.current = { uri };

  const data = await cache.get<PlayResponse>(MEDIA_TRACK + uri);
  if (!data) {
    const resource = parseURI(uri);
    if (!resource) throw boom.notFound();
    const { volatile, error: trackError, tracks } = await getTrack(resource);
    if (!tracks.length || trackError) {
      const resTracks: PlayResponse = { error: 'track_not_found' };
      await saveResponse(resource, resTracks, volatile);
      return resTracks;
    }

    const track = tracks[0];
    const response = { media: { track } } as UpdateResponse;

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

    if (response.error) {
      return { error: response.error };
    }

    return response;
  }

  await redis.set(sessionKey, JSON.stringify(session));

  return { media: data.media };
};

export default update;
