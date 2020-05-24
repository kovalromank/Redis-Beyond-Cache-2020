import { USER_FAILED, USER_REQUESTED, USER_SUCCESS } from '../types/user';
import { IUser } from '../../models/user';
import { IUserError } from '../../services/user.service';

export const userRequested = (session: string) => {
  return {
    type: USER_REQUESTED,
    payload: session,
  };
};

export const userSuccess = (userData: { data: IUser }) => {
  return {
    type: USER_SUCCESS,
    payload: userData.data,
  };
};

export const userFailed = (error: IUserError) => {
  return {
    type: USER_FAILED,
    payload: error,
  };
};
