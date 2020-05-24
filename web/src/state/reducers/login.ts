import { LOGIN, LOGOUT } from '../types/login';

export type ILoginState = {
  session: string;
  name: string;
  id: string;
  uri: string;
  image?: {
    width?: number;
    height?: number;
    url: string;
  };
};

export const initialState = {
  session: '',
  name: '',
  id: '',
  uri: '',
};

type IAction = {
  type?: string;
  payload?: any;
};

const reducer = (state: ILoginState = initialState, action: IAction = {}): ILoginState => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return payload || { ...initialState };

    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
