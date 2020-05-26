import { PLAY, PLAY_REQUESTED, PAUSE, PAUSE_REQUESTED } from '../types/media';
import { IPlayMedia } from '../../models/media';

export type IMediaState = {
  busy: boolean;
  playing: boolean;
  track: IPlayMedia;
};

export const initialState = {
  busy: false,
  playing: false,
  track: (null as unknown) as IPlayMedia,
};

type IAction = {
  type?: string;
  payload?: any;
};

const reducer = (state: IMediaState = initialState, action: IAction = {}): IMediaState => {
  const { type, payload } = action;

  switch (type) {
    case PLAY:
      return { busy: false, playing: true, track: payload };

    case PLAY_REQUESTED:
      return { busy: true, playing: state.playing, track: state.track };

    case PAUSE:
      return { busy: false, playing: false, track: state.track };

    case PAUSE_REQUESTED:
      return { busy: true, playing: state.playing, track: state.track };

    default:
      return state;
  }
};

export default reducer;
