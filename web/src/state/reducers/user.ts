import { USER_FAILED, USER_REQUESTED, USER_SUCCESS, USER_FETCHING } from '../types/user';

export type IUserState = SpotifyDetails & { fetching: boolean; error: object | undefined };

export const initialState = {
  playlists: [],
  artists: [],
  tracks: [],
  fetching: true,
  error: undefined,
};

type IAction = {
  type?: string;
  payload?: any;
};

const reducer = (state: IUserState = initialState, action: IAction = {}): IUserState => {
  const { type, payload } = action;

  switch (type) {
    case USER_FETCHING:
      return {
        fetching: true,
        error: undefined,
        playlists: [],
        artists: [],
        tracks: [],
      };
    case USER_REQUESTED:
      return {
        fetching: true,
        error: undefined,
        playlists: [],
        artists: [],
        tracks: [],
      };

    case USER_SUCCESS:
      return {
        fetching: false,
        error: undefined,
        ...payload,
      };

    case USER_FAILED:
      return {
        fetching: false,
        error: payload,
        playlists: [],
        artists: [],
        tracks: [],
      };

    default:
      return state;
  }
};

export default reducer;
