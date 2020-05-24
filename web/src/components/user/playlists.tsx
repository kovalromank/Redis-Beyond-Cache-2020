import React from 'react';

import { Card } from '@material-ui/core';

import Carousel from '../carousel';

type PlaylistsProps = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
};

const Playlists: React.FunctionComponent<PlaylistsProps> = ({ playlists }) => {
  console.log(playlists);

  return (
    // <GridList cellHeight={160} cols={3}>

    // </GridList>
    <Carousel>
      {playlists.map((playlist, i) => (
        <div key={playlist.id} style={{ width: 300 }}>
          {playlist.images?.length && (
            <img width="300" src={playlist.images[0].url} alt={`Playlist ${i} cover`} />
          )}
          <div>{playlist.name}</div>
          <div>{playlist.owner.display_name}</div>
        </div>
      ))}
    </Carousel>
  );
};

export default Playlists;
