import { USER_FAILED, USER_REQUESTED, USER_SUCCESS } from '../types/user';

export type IUserState = SpotifyDetails & { fetching: boolean; error: object | undefined };

export const initialState = {
  playlists: [],
  artists: [],
  tracks: [],
  fetching: false,
  error: undefined,
};

type IAction = {
  type?: string;
  payload?: any;
};

const reducer = (state: IUserState = initialState, action: IAction = {}): IUserState => {
  const { type, payload } = action;

  switch (type) {
    case USER_REQUESTED:
      return {
        ...initialState,
        fetching: true,
        error: undefined,
      };

    case USER_SUCCESS:
      return {
        ...payload,
        fetching: false,
        error: undefined,
      };

    case USER_FAILED:
      return {
        ...state,
        fetching: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default reducer;
