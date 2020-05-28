import { Dispatch } from 'react';

import { MiddlewareAPI, AnyAction } from 'redux';

import { PLAY_REQUESTED, PAUSE_REQUESTED, UPDATE_REQUESTED } from '../types/media';
import * as mediaService from '../../services/media';
import { play, pause } from '../actions/media';

import { IState } from '../createStore';
import { IPlayError, IPlaySuccess } from '../../services/media';

// TODO: handle 401 error
const userCustomMiddleware = () => {
  return (store: MiddlewareAPI<any, IState>) => (next: Dispatch<AnyAction>) => (
    action: AnyAction,
  ) => {
    switch (action.type) {
      case PLAY_REQUESTED: {
        mediaService
          .play({ session: store.getState().loginReducer.session, spotifyURI: action.payload })
          .then((playData) => {
            if ((playData as IPlayError).error) {
            } else {
              store.dispatch(play(playData as IPlaySuccess));
            }
          })
          .catch((err) => {
            //
          });
        break;
      }
      case PAUSE_REQUESTED: {
        mediaService
          .pause({ session: store.getState().loginReducer.session })
          .then(() => {
            store.dispatch(pause());
          })
          .catch((err) => {
            //
          });
        break;
      }
      case UPDATE_REQUESTED: {
        console.log('UPDATE_REQUESTED');
        const session = store.getState().loginReducer.session;
        if (!session) return;

        mediaService
          .update({ session: store.getState().loginReducer.session })
          .then((updateData: any) => {
            if (updateData.media) {
              store.dispatch(play(updateData as IPlaySuccess));
            }
          })
          .catch((err) => {
            //
          });
        break;
      }
      default:
        next(action);
    }
  };
};

export default userCustomMiddleware;
