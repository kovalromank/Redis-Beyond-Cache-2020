import { Dispatch } from 'react';

import { MiddlewareAPI, AnyAction } from 'redux';

import { USER_REQUESTED } from '../types/user';
import userService, { IUserSuccess, IUserError } from '../../services/user';
import { userFetching, userSuccess, userFailed } from '../actions/user';

import { IState } from '../createStore';

const userCustomMiddleware = () => {
  return (store: MiddlewareAPI<any, IState>) => (next: Dispatch<AnyAction>) => (
    action: AnyAction,
  ) => {
    switch (action.type) {
      case USER_REQUESTED:
        store.dispatch(userFetching());

        userService({ session: store.getState().loginReducer.session })
          .then((userData) => {
            if ((userData as IUserError).error) {
              store.dispatch(userFailed(userData as IUserError));
            } else {
              store.dispatch(userSuccess({ data: userData as IUserSuccess }));
            }
          })
          .catch((error) => {
            store.dispatch(userFailed(error));
          });

        break;
      default:
        next(action);
    }
  };
};

export default userCustomMiddleware;
