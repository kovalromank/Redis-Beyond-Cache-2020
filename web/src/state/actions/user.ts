import { USER_FAILED, USER_REQUESTED, USER_SUCCESS, USER_FETCHING } from '../types/user';
import { IUser } from '../../models/user';
import { IUserError } from '../../services/user';

export const userRequested = () => {
  return {
    type: USER_REQUESTED,
  };
};

export const userFetching = () => {
  return { type: USER_FETCHING };
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
