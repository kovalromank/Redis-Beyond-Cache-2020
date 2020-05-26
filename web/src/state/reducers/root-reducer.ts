import { combineReducers, Reducer } from 'redux';
import loginReducer, { ILoginState } from './login';
import userReducer, { IUserState } from './user';
import mediaReducer, { IMediaState } from './media';
import { LOGOUT } from '../types/login';

export type IStore = {
  loginReducer: ILoginState;
  userReducer: IUserState;
  mediaReducer: IMediaState;
};

const appReducer = combineReducers({
  loginReducer,
  userReducer,
  mediaReducer,
});

const rootReducer: Reducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
