import React, { Dispatch } from 'react';

import { Action } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { Box, Card, Grid, Typography, IconButton, Slide } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import MusicNoteEighth from 'mdi-material-ui/MusicNoteEighth';
import Fullscreen from 'mdi-material-ui/Fullscreen';
import FullscreenExit from 'mdi-material-ui/FullscreenExit';

import Play from 'mdi-material-ui/Play';
import Pause from 'mdi-material-ui/Pause';

import { IState } from '../state/createStore';
import { IMediaState } from '../state/reducers/media';
import { playRequested, pauseRequested, updateRequested } from '../state/actions/media';

import '../scss/components/media-controller.scss';

const INTERVAL = 5 * 1000;
const update = (dispatch: Dispatch<Action>) => {
  dispatch(updateRequested());
  console.log('update');
  setTimeout(() => update(dispatch), INTERVAL);
};

type MediaControllerProps = {
  playing: IMediaState['playing'];
  busy: IMediaState['busy'];
  media: IMediaState['media'];
};

let played = false;
let updating = false;

const MediaController: React.FunctionComponent<MediaControllerProps> = ({
  playing,
  media,
  busy,
}) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isView, setIsView] = React.useState(location.pathname.includes('view'));

  if (!played) played = playing;

  const show = played && media.track ? true : false;

  const togglePlayback: React.EventHandler<React.MouseEvent> = (event) => {
    if (busy) return;
    if (playing) dispatch(pauseRequested());
    else dispatch(playRequested(media.track.uri));
  };

  const enterFullscreen: React.EventHandler<React.MouseEvent> = (event) => {
    isView ? history.push('/user') : history.push('/view');
  };

  React.useEffect(() => {
    console.log('in effect');
    setIsView(location.pathname.includes('view'));

    if (!updating) {
      update(dispatch);
      return;
    }

    updating = true;

    return () => {
      updating = false;
    };
  }, [dispatch, location]);

  if (!media.track.id) return null;

  return (
    <Slide direction="up" in={show}>
      <Box className="media-controller">
        <Card className="container">
          <Grid container>
            <Grid item className="image-wrapper">
              <div
                className="image"
                style={{
                  backgroundImage: `url(${media.track.album.images[0]?.url})`,
                }}
              >
                {media.track.album.images[0]?.url ? null : (
                  <Grid
                    container
                    className="placeholder fill-height"
                    justify="center"
                    alignContent="center"
                  >
                    <MusicNoteEighth fontSize="inherit" color="action" />
                  </Grid>
                )}
              </div>
            </Grid>
            <Grid item className="content grow">
              <Grid className="fill-height" container wrap="nowrap" alignItems="center">
                <Grid item className="grow overflow-hidden">
                  <Typography className="text" variant="h6">
                    <span>{media.track.name}</span>
                  </Typography>
                  <Typography className="text">
                    <span>{media.track.artists[0].name}</span>
                  </Typography>
                </Grid>
                <Grid item className="fill-height">
                  <Grid container alignContent="center" className="fill-height">
                    <IconButton color="inherit" className="button" onClick={togglePlayback}>
                      {playing ? <Pause /> : <Play />}
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item className="fill-height">
                  <Grid container alignContent="center" className="fill-height">
                    <Box ml={1}>
                      <IconButton color="inherit" className="button" onClick={enterFullscreen}>
                        {isView ? <FullscreenExit /> : <Fullscreen />}
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Slide>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    playing: state.mediaReducer.playing,
    busy: state.mediaReducer.busy,
    media: state.mediaReducer.media,
  };
};

export default connect(mapStateToProps)(MediaController);
