import * as boom from '@hapi/boom';

import { spotify } from '../../utils';
import { verify } from '../../helpers/spotify';

const pause = async (sessionKey: string) => {
  const { authorized, session } = await verify(sessionKey);
  if (!authorized) throw boom.unauthorized();
  spotify.setAccessToken(session.accessToken);
  await spotify.pause();
};

export default pause;
