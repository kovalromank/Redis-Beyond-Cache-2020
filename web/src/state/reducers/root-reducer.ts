import { combineReducers } from 'redux';
import loginReducer, { ILoginState } from './login';
import userReducer, { IUserState } from './user';

export default combineReducers({
  loginReducer,
  userReducer,
});

export type IStore = {
  loginReducer: ILoginState;
  userReducer: IUserState;
};
