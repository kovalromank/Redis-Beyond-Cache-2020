import { Handler } from 'express';

import * as LogoutService from '../services/logout.service';

type LogoutQuery = AuthenticatedQuery;

export const logout: Handler = async (req, res, next) => {
  const { session } = req.query as LogoutQuery;

  await LogoutService.logout(session);

  res.sendStatus(204);
};
