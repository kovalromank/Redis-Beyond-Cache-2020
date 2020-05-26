import { axios } from '../utils';

export type ILogoutParams = {
  session: string;
};

const logoutService = async (params: ILogoutParams): Promise<void> => {
  try {
    await axios({
      url: '/logout',
      params: {
        session: params.session,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default logoutService;
