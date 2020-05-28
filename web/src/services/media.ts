import { axios } from '../utils';

export type IPlaySuccess = SpotifyMediaPlay;

export type IPlayError = {
  error: any;
  code?: number;
  data?: any;
};

export type IPlayParams = {
  session: string;
  spotifyURI: string;
};

export const play = async (params: IPlayParams): Promise<IPlaySuccess | IPlayError> => {
  try {
    const { data } = await axios({
      method: 'PUT',
      url: '/media/play',
      params: {
        session: params.session,
        spotify_uri: params.spotifyURI,
      },
    });
    return data;
  } catch (error) {
    if (error.response) {
      return {
        error,
        code: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        error,
      };
    }

    return {
      error,
    };
  }
};

export type IPauseError = {
  error: any;
  code?: number;
  data?: any;
};

export type IPauseParams = {
  session: string;
};

export const pause = async (params: IPauseParams): Promise<void | IPauseError> => {
  try {
    const { data } = await axios({
      method: 'PUT',
      url: '/media/pause',
      params: { session: params.session },
    });
    return data;
  } catch (error) {
    if (error.response) {
      return {
        error,
        code: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        error,
      };
    }

    return {
      error,
    };
  }
};

export type IUpdateSuccess = SpotifyMediaPlay;

export type IUpdateError = {
  error: any;
  code?: number;
  data?: any;
};

export type IUpdateParams = {
  session: string;
};

export const update = async (params: IUpdateParams): Promise<IUpdateSuccess | IUpdateError> => {
  try {
    const { data } = await axios({
      method: 'PUT',
      url: '/media/update',
      params: { session: params.session },
    });
    return data;
  } catch (error) {
    if (error.response) {
      return {
        error,
        code: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        error,
      };
    }

    return {
      error,
    };
  }
};
