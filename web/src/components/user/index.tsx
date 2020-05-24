import React from 'react';

import { Avatar, Box, Link } from '@material-ui/core';

import PlaylistSection from './playlists';
import ArtistsSection from './artists';
import TracksSection from './tracks';

type UserViewProps = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  artists: SpotifyApi.ArtistObjectFull[];
  tracks: SpotifyApi.TrackObjectFull[];
};

const UserView: React.FunctionComponent<UserViewProps> = ({ playlists, artists, tracks }) => {
  return (
    <>
      {playlists.length && <PlaylistSection playlists={playlists} />}
      {artists.length && <ArtistsSection artists={artists} />}
      {tracks.length && <TracksSection tracks={tracks} />}
    </>
  );
};

export default UserView;
