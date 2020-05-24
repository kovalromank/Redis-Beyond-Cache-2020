import React from 'react';

import { PageProps } from 'gatsby';
import { connect, useDispatch } from 'react-redux';
import { Button, Grid, CircularProgress } from '@material-ui/core';

import { IState } from '../state/createStore';
import { ILoginState } from '../state/reducers/login';
import { IUserState } from '../state/reducers/user';
import { userRequested } from '../state/actions/user';

import Layout from '../components/layout';
import UserView from '../components/user';

import { axios } from '../utils';

type UserPageProps = PageProps & ILoginState & IUserState;

const UserPage: React.FunctionComponent<UserPageProps> = ({
  session,
  name,
  image,
  navigate,
  playlists,
  artists,
  tracks,
  fetching,
  error,
}) => {
  if (!name) {
    typeof window !== 'undefined' && navigate('/', { replace: true });
    return null;
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userRequested(session));
  }, []);

  if (error) {
    typeof window !== 'undefined' &&
      navigate(`/?error=${encodeURIComponent((error as any).message || 'Error occurred')}`, {
        replace: true,
      });
    return null;
  }

  return (
    <Layout name={name} image={image} title={`👋 ${name}`}>
      <Grid
        className="fill-height"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {fetching || !playlists?.length ? (
          <CircularProgress size={80} thickness={5} />
        ) : (
          <UserView playlists={playlists} artists={artists} tracks={tracks} />
        )}
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    ...state.loginReducer,
    ...state.userReducer,
  };
};

export default connect(mapStateToProps)(UserPage);
