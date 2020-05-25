import React from 'react';

import { Toolbar, AppBar } from '@material-ui/core';

// import { ILoginState } from '../state/reducers/login';
import Spacer from './spacer';
import UserHeader from './user-header';

import logo from '../images/Spotify_Logo_RGB_Black.png';

type AppBarProps = {
  name?: string;
  image?: {
    width?: number;
    height?: number;
    url: string;
  };
};

const DefaultAppBar: React.FunctionComponent<AppBarProps> = ({ name, image }) => {
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
