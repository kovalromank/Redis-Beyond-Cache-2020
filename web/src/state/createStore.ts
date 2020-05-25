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

export default () => {
  return createStore(
    combinedReducers,
    getLoadedState(),
    composeWithDevTools(
      applyMiddleware(save({ states: ['loginReducer'] }), userCustomMiddleware()),
    ),
  );
};

const getLoadedState = () => {
  return {
    ...load({ states: ['loginReducer'] }),
  };
};
