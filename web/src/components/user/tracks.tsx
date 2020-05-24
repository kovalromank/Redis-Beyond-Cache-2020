import React from 'react';

type TracksProps = {
  tracks: SpotifyApi.TrackObjectFull[];
};

const Tracks: React.FunctionComponent<TracksProps> = ({ tracks }) => {
  return <div>Test</div>;
};

export default Tracks;
