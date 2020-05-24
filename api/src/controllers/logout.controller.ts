import { Handler, Request } from 'express';

import * as LogoutService from '../services/logout.service';

export const logout: Handler = async (req: Request, res, next) => {
  const { session } = req.query as LogoutControllerQuery;

  await LogoutService.logout(session);

  res.sendStatus(204);
};
