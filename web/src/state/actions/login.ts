import { LOGIN, LOGOUT, LOGOUT_REQUESTED } from '../types/login';
import { ILoginState } from '../reducers/login';

export const login = (data: ILoginState) => ({
  type: LOGIN,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT,
});

export const logoutRequested = () => ({
  type: LOGOUT_REQUESTED,
});
