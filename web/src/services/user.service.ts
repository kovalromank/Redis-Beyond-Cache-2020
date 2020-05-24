import { axios } from '../utils';

export type IUserParams = {
  session?: string;
};

export type IUserSuccess = SpotifyDetails;

export type IUserError = {
  error: any;
  code?: number;
  data?: any;
};

const userService = async (params: IUserParams): Promise<IUserSuccess | IUserError> => {
  if (!params.session)
    return {
      playlists: [],
      artists: [],
      tracks: [],
    };

  try {
    const { data }: { data: SpotifyDetails } = await axios({
      url: '/user',
      params: {
        session: params.session,
      },
    });

    return data;
    // .then((response) => {
    //   const data: SpotifyDetails = response.data;
    //   console.log(data);
    //   dispatch(update(data));
    //   setLoading(false);
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
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

export default userService;
