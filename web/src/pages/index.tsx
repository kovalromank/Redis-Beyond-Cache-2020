import React from 'react';

import { Snackbar, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useQueryParam, StringParam, JsonParam } from 'use-query-params';

import Layout from '../components/layout';
import User from '../components/User';

const IndexPage = () => {
  // const [code] = useQueryParam('code', NumberParam);
  const [data] = useQueryParam('data', JsonParam);
  const [error] = useQueryParam('error', StringParam);

  const [open, setOpen] = React.useState(!!error);

  const handleClose = (event, reason?) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const href = `${process.env.API_URL}/login/spotify`;

  const view = data?.user ? (
    <User user={data?.user} />
  ) : (
    <Button href={href} variant="contained" color="primary">
      Login with Spotify
    </Button>
  );

  return (
    <>
      <Layout title="🏡 Home">
        <Grid
          className="fill-height"
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          {view}
        </Grid>
      </Layout>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" elevation={6} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default IndexPage;
