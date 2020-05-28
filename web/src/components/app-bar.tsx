import React from 'react';

import { Toolbar, AppBar, Typography } from '@material-ui/core';

import Spacer from './spacer';
import UserHeader from './user-header';

// import logo from '../images/Spotify_Logo_RGB_Black.png';

import '../scss/components/app-bar.scss';

const DefaultAppBar: React.FunctionComponent = () => {
  return (
    <AppBar position="fixed" className="app-bar" elevation={0}>
      <Toolbar>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          InSync
        </Typography>
        {/* <img height="40" width="auto" src={logo} alt="Logo" /> */}
        <Spacer />
        <UserHeader />
      </Toolbar>
    </AppBar>
  );
};

export default DefaultAppBar;
