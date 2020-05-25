import React from 'react';

import { connect, useDispatch } from 'react-redux';
import qs from 'query-string';
import { Snackbar, Button, Grid, SnackbarCloseReason } from '@material-ui/core';

import { useHistory, useLocation } from 'react-router-dom';

import Alert from '../components/alert';
import { IState } from '../state/createStore';
import { ILoginState } from '../state/reducers/login';
import { login } from '../state/actions/login';

import Layout from '../components/layout';

type IndexPageProps = { session: string };

const IndexPage: React.FunctionComponent<IndexPageProps> = ({ session }) => {
  const href = `${process.env.REACT_APP_API_URL}/login/spotify`;

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const query = qs.parse(location.search);
  const { error } = query;

  React.useEffect(() => {
    if (query.data) {
      try {
        const data: ILoginState = JSON.parse(query.data as string);
        dispatch(login(data));
        history.replace('/user');
        return;
      } catch (err) {}
    }

    if (session && !error) {
      typeof window !== 'undefined' && history.replace('/user');
      return;
    }
  }, [session, history, query, error, dispatch]);

  const [open, setOpen] = React.useState(!!error);

  const handleClose = (event: React.SyntheticEvent<any>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Layout title="Login">
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
        <Alert severity="error" onClose={handleClose}>
          {error}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    session: state.loginReducer.session,
  };
};

export default connect(mapStateToProps)(IndexPage);
