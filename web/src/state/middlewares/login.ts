import { Dispatch } from 'react';

import { MiddlewareAPI, AnyAction } from 'redux';

import { LOGOUT_REQUESTED } from '../types/login';
import logoutService from '../../services/logout';
import { logout } from '../actions/login';

import { IState } from '../createStore';

const logoutCustomMiddleware = () => {
  return (store: MiddlewareAPI<any, IState>) => (next: Dispatch<AnyAction>) => (
    action: AnyAction,
  ) => {
    switch (action.type) {
      case LOGOUT_REQUESTED:
        logoutService({ session: store.getState().loginReducer.session }).catch((err) =>
          console.error(err),
        );
        store.dispatch(logout());
        break;
      default:
        next(action);
    }
  };
};

export default logoutCustomMiddleware;
