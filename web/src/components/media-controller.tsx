import React from 'react';

import { connect, useDispatch } from 'react-redux';
import { Box, Card, Grid, Typography, IconButton, Paper, Slide } from '@material-ui/core';
import MusicNoteEighth from 'mdi-material-ui/MusicNoteEighth';

import Play from 'mdi-material-ui/Play';
import Pause from 'mdi-material-ui/Pause';

import { IState } from '../state/createStore';
import { IMediaState } from '../state/reducers/media';
import { playRequested, pauseRequested } from '../state/actions/media';

import '../scss/components/media-controller.scss';

type MediaControllerProps = {
  playing: IMediaState['playing'];
  busy: IMediaState['busy'];
  track: IMediaState['track'];
};

let played = false;

const MediaController: React.FunctionComponent<MediaControllerProps> = ({
  playing,
  track,
  busy,
}) => {
  const dispatch = useDispatch();

  if (!played) played = playing;

  const show = played && track ? true : false;

  const togglePlayback: React.EventHandler<React.MouseEvent> = (event) => {
    if (busy) return;
    if (playing) dispatch(pauseRequested());
    else dispatch(playRequested((track as SpotifyApi.TrackObjectFull).uri));
  };

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Box className="media-controller" mb={2} mr={2}>
        <Card className="container">
          <Box px={2} py={2}>
            <Grid container>
              <Grid item className="image-wrapper">
                <Paper
                  elevation={2}
                  className="image"
                  style={{
                    backgroundImage: `url(${track?.album.images[0]?.url})`,
                  }}
                >
                  {track?.album.images[0]?.url ? null : (
                    <Grid
                      container
                      className="placeholder fill-height"
                      justify="center"
                      alignContent="center"
                    >
                      <MusicNoteEighth fontSize="inherit" color="action" />
                    </Grid>
                  )}
                </Paper>
              </Grid>
              <Grid item>
                <Grid className="fill-height" container wrap="nowrap" alignItems="flex-end">
                  <Grid item className="grow overflow-hidden">
                    <Box px={2}>
                      <Typography className="text" variant="h6">
                        <span>{track?.name}</span>
                      </Typography>
                      <Typography className="text">
                        <span>{track?.artists[0].name}</span>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item className="fill-height">
                    <Grid container alignContent="center" className="fill-height">
                      <IconButton color="inherit" className="button" onClick={togglePlayback}>
                        {playing ? <Pause /> : <Play />}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Slide>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    playing: state.mediaReducer.playing,
    busy: state.mediaReducer.busy,
    track: state.mediaReducer.track,
  };
};

export default connect(mapStateToProps)(MediaController);
