import React from 'react';

type ArtistsProps = {
  artists: SpotifyApi.ArtistObjectFull[];
};

const Artists: React.FunctionComponent<ArtistsProps> = ({ artists }) => {
  return <div>Test</div>;
};

export default Artists;
