import { PLAY, PLAY_REQUESTED, PAUSE, PAUSE_REQUESTED, UPDATE_REQUESTED } from '../types/media';
import { IPlayMedia } from '../../models/media';

export const playRequested = (data: string) => ({
  type: PLAY_REQUESTED,
  payload: data,
});

export const play = (data: IPlayMedia) => ({
  type: PLAY,
  payload: data,
});

export const pauseRequested = () => ({
  type: PAUSE_REQUESTED,
});

export const pause = () => ({
  type: PAUSE,
});

export const updateRequested = () => ({
  type: UPDATE_REQUESTED,
});
