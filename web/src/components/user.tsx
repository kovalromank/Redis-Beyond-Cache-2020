import React from 'react';

import { Box } from '@material-ui/core';

import { SpotifyUser } from '../types/Spotify.d';

type UserProps = { user: SpotifyUser };

const User: React.FunctionComponent<UserProps> = ({ user }) => {
  const image = user.images?.length ? (
    <img width="250" height="auto" className="img-fluid" src={user.images[0].url} />
  ) : (
    ''
  );

  return (
    <Box textAlign="center" p={4}>
      <div>{image}</div>
      <Box fontWeight="fontWeightLight" fontSize="h4.fontSize" mt={3}>
        <span role="img" aria-label="Waving hand">
          👋
        </span>{' '}
        Hello, <i>{user.display_name}</i>
      </Box>
    </Box>
  );
};

export default User;
