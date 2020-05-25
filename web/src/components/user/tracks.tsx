import React from 'react';

import { connect } from 'react-redux';
import MusicNoteEighth from 'mdi-material-ui/MusicNoteEighth';

import { IState } from '../../state/createStore';
import { IUserState } from '../../state/reducers/user';

import Carousel from '../carousel';
import CarouselItem from '../carousel-item';

type TracksProps = {
  tracks: IUserState['tracks'];
};

const Title: React.FunctionComponent = () => (
  <div>
    Your top <span className="label">tracks</span>
  </div>
);

const Tracks: React.FunctionComponent<TracksProps> = ({ tracks }) => {
  return (
    <Carousel title={<Title />}>
      {tracks.map((track, i) => (
        <CarouselItem
          key={i}
          title={track.name}
          subtitle={track.album.name}
          image={track.album.images.length ? track.album.images[0].url : undefined}
          imagePlaceholder={<MusicNoteEighth color="action" fontSize="inherit" />}
        />
      ))}
    </Carousel>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    tracks: state.userReducer.tracks,
  };
};

export default connect(mapStateToProps)(Tracks);
