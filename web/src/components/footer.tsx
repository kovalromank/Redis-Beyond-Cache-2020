import React from 'react';

import { Toolbar, IconButton } from '@material-ui/core';
import Github from 'mdi-material-ui/Github';

const DefaultFooter = () => {
  return (
    <Toolbar variant="dense" style={{ justifyContent: 'flex-end' }}>
      {/* Submitted to&nbsp; */}
      {/* <Link href="https://redisbeyondcache2020.devpost.com/">Redis ‘Beyond Cache’ Hackathon</Link> */}
      &nbsp;
      <IconButton
        target="_blank"
        rel="noopener"
        href="https://github.com/KovalRomanK/Redis-Beyond-Cache-2020"
        style={{ marginRight: '-12px' }}
      >
        <Github />
      </IconButton>
    </Toolbar>
  );
};

export default DefaultFooter;
