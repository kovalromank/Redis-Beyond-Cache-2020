import React from 'react';

import { connect, useDispatch } from 'react-redux';

import Play from 'mdi-material-ui/Play';

import { IconButton } from '@material-ui/core';

import { playRequested } from '../../state/actions/media';
import { IState } from '../../state/createStore';
import { IMediaState } from '../../state/reducers/media';

type MediaButonProps = {
  spotifyURI: string;
  busy: IMediaState['busy'];
};

const MediaButon: React.FunctionComponent<MediaButonProps> = ({ busy, spotifyURI }) => {
  const dispatch = useDispatch();

  const play: React.EventHandler<React.MouseEvent> = (event) => {
    if (busy) return;
    dispatch(playRequested(spotifyURI));
  };

  return (
    <IconButton color="inherit" size="medium" className="media-button" onClick={play}>
      <Play />
    </IconButton>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    busy: state.mediaReducer.busy,
  };
};
export default connect(mapStateToProps)(MediaButon);
