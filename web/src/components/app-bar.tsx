import React from 'react';

import { Toolbar, AppBar } from '@material-ui/core';

import Spacer from './spacer';
import UserHeader from './user-header';

import logo from '../images/Spotify_Logo_RGB_Black.png';

const DefaultAppBar: React.FunctionComponent = () => {
  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar>
        <img height="40" width="auto" src={logo} alt="Logo" />
        <Spacer />
        <UserHeader />
      </Toolbar>
    </AppBar>
  );
};

export default DefaultAppBar;
