import { Handler, Request } from 'express';

import * as UserService from '../services/user.service';

export const get: Handler = async (req: Request, res, next) => {
  const { session } = req.query as UserControllerQuery;

  const data = await UserService.get(session);

  res.json(data);
};
