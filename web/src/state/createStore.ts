import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { load, save } from 'redux-localstorage-simple';

import combinedReducers from './reducers/root-reducer';
import { ILoginState } from './reducers/login';

import userCustomMiddleware from './middlewares/userCustomMiddleware';
import { IUserState } from './reducers/user';

export type IState = {
  loginReducer: ILoginState;
  userReducer: IUserState;
};

export default (preloadedState: IState) => {
  return createStore(
    combinedReducers,
    getLoadedState(preloadedState),
    composeWithDevTools(applyMiddleware(save({ states: ['loginReducer'] }), userCustomMiddleware()))
  );
};

const getLoadedState = (preloadedState: IState | any) => {
  if (typeof window !== 'undefined')
    return {
      ...preloadedState,
      ...load({ states: ['loginReducer'], disableWarnings: true }),
    };

  return {
    ...preloadedState,
  };
};
