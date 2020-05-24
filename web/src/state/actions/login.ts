import { LOGIN, LOGOUT } from '../types/login';
import { ILoginState } from '../reducers/login';

export const login = (data: ILoginState) => ({
  type: LOGIN,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT,
});
