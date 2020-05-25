import React from 'react';

import { connect } from 'react-redux';
import AccountMusic from 'mdi-material-ui/AccountMusic';

import { IState } from '../../state/createStore';
import { IUserState } from '../../state/reducers/user';

import Carousel from '../carousel';
import CarouselItem from '../carousel-item';

type ArtistsProps = {
  artists: IUserState['artists'];
};

const getArtistSubtitle = (artist: ArtistsProps['artists'][0]): string | undefined => {
  if (artist.genres.length > 1) return `${artist.genres[0]} / ${artist.genres[1]}`;
  if (artist.genres.length === 1) return `${artist.genres[0]}`;
  return undefined;
};

const Title: React.FunctionComponent = () => (
  <div>
    Your top <span className="label">artists</span>
  </div>
);

const Artists: React.FunctionComponent<ArtistsProps> = ({ artists }) => {
  return (
    <Carousel title={<Title />}>
      {artists.map((artist, i) => (
        <CarouselItem
          imagePlaceholder={<AccountMusic color="action" fontSize="inherit" />}
          key={i}
          title={artist.name}
          subtitle={getArtistSubtitle(artist)}
          image={artist.images?.length ? artist.images[0].url : undefined}
        />
      ))}
    </Carousel>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    artists: state.userReducer.artists,
  };
};

export default connect(mapStateToProps)(Artists);
