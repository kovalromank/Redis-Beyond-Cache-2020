import React from 'react';

import { Grid } from '@material-ui/core';

import Layout from '../components/layout';

const NotFoundPage = () => {
  const skull = (
    <span role="img" aria-label="Skull">
      💀
    </span>
  );

  return (
    <Layout title="😵 404: Not found">
      <Grid
        className="fill-height"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <h1>
          {skull} NOT FOUND {skull}
        </h1>
      </Grid>
    </Layout>
  );
};

export default NotFoundPage;
