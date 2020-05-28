import {
  PLAY,
  PLAY_REQUESTED,
  PAUSE,
  PAUSE_REQUESTED,
  PLAY_FAILED,
  PAUSE_FAILED,
  UPDATE_REQUESTED,
} from '../types/media';
import { IPlayMedia } from '../../models/media';

export type IMediaState = {
  busy: boolean;
  playing: boolean;
  media: IPlayMedia['media'];
  mediaError: IPlayMedia['error'];
};

export const initialState = {
  busy: false,
  playing: false,
  media: { track: {}, youtube: {} },
} as IMediaState;

type IAction = {
  type?: string;
  payload?: any;
};

const reducer = (state: IMediaState = initialState, action: IAction = {}): IMediaState => {
  const { type, payload } = action;

  switch (type) {
    case PLAY_REQUESTED:
    case UPDATE_REQUESTED:
    case PAUSE_REQUESTED:
      return {
        busy: true,
        playing: state.playing,
        media: state.media,
        mediaError: state.mediaError,
      };

    case PLAY:
      return { busy: false, playing: true, media: payload.media, mediaError: '' };

    case PLAY_FAILED:
      return {
        busy: false,
        playing: state.playing,
        media: {} as IMediaState['media'],
        mediaError: payload.error,
      };

    case PAUSE:
      return { busy: false, playing: false, media: state.media, mediaError: state.mediaError };

    case PAUSE_FAILED:
      return {
        busy: false,
        playing: state.playing,
        media: state.media,
        mediaError: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
