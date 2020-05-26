import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { load, save } from 'redux-localstorage-simple';

import combinedReducers from './reducers/root-reducer';

import userMiddleware from './middlewares/user';
import { IUserState } from './reducers/user';

import loginMiddleware from './middlewares/login';
import { ILoginState } from './reducers/login';

import mediaMiddleware from './middlewares/media';
import { IMediaState } from './reducers/media';

export type IState = {
  loginReducer: ILoginState;
  userReducer: IUserState;
  mediaReducer: IMediaState;
};

export default () => {
  return createStore(
    combinedReducers,
    getLoadedState(),
    composeWithDevTools(
      applyMiddleware(
        save({ states: ['loginReducer'] }),
        userMiddleware(),
        loginMiddleware(),
        mediaMiddleware(),
      ),
    ),
  );
};

const getLoadedState = () => {
  return {
    ...load({ states: ['loginReducer'] }),
  };
};
