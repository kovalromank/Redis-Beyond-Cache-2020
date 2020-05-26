import React from 'react';

import { connect } from 'react-redux';
import PlaylistMusic from 'mdi-material-ui/PlaylistMusic';

import { IState } from '../../state/createStore';
import { IUserState } from '../../state/reducers/user';

import Carousel from '../carousel';
import CarouselItem from '../carousel/item';

type PlaylistsProps = {
  playlists: IUserState['playlists'];
};

const Title: React.FunctionComponent = () => (
  <div>
    Your top <span className="label">playlists</span>
  </div>
);

const Playlists: React.FunctionComponent<PlaylistsProps> = ({ playlists }) => {
  return (
    <Carousel title={<Title />}>
      {playlists.map((playlist, i) => (
        <CarouselItem
          spotifyURI={playlist.uri}
          key={i}
          title={playlist.name}
          subtitle={playlist.owner.display_name}
          image={playlist.images?.length ? playlist.images[0].url : undefined}
          imagePlaceholder={<PlaylistMusic color="action" fontSize="inherit" />}
        />
      ))}
    </Carousel>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    playlists: state.userReducer.playlists,
  };
};

export default connect(mapStateToProps)(Playlists);
