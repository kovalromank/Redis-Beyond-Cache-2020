import React from 'react';

import { PageProps } from 'gatsby';
import { connect, useDispatch } from 'react-redux';
import { useQueryParam, StringParam, JsonParam } from 'use-query-params';
import { Snackbar, Button, Grid, SnackbarCloseReason } from '@material-ui/core';

import Alert from '../components/alert';
import { IState } from '../state/createStore';
import { ILoginState } from '../state/reducers/login';
import { login } from '../state/actions/login';

import Layout from '../components/layout';

type IndexPageProps = PageProps & ILoginState;

const IndexPage: React.FunctionComponent<IndexPageProps> = ({ name, image, navigate }) => {
  const href = `${process.env.API_URL}/login/spotify`;

  const [data]: [ILoginState, any] = useQueryParam('data', JsonParam);
  const [error] = useQueryParam('error', StringParam);
  const [open, setOpen] = React.useState(!!error);
  const dispatch = useDispatch();

  const handleClose = (event: React.SyntheticEvent<any>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  if (data) {
    dispatch(login(data));
    typeof window !== 'undefined' && navigate('/user', { replace: true });
    return null;
  }

  if (name && !error) {
    typeof window !== 'undefined' && navigate('/user', { replace: true });
    return null;
  }

  return (
    <Layout name={name} image={image} title="🔑 Login">
      <Grid
        className="fill-height"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Button size="large" href={href} variant="contained" color="primary">
          Login with Spotify
        </Button>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>{error}</Alert>
      </Snackbar>
    </Layout>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    ...state.loginReducer,
  };
};

export default connect(mapStateToProps)(IndexPage);
