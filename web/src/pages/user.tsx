import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { Box } from '@material-ui/core';

import { IState } from '../state/createStore';
import { ILoginState } from '../state/reducers/login';
import { IUserState } from '../state/reducers/user';
import { userRequested } from '../state/actions/user';

import { useHistory } from 'react-router-dom';

import Layout from '../components/layout';
import PageLoading from '../components/page-loading';
import PlaylistsSection from '../components/user/playlists';
import ArtistsSection from '../components/user/artists';
import TracksSection from '../components/user/tracks';

import '../scss/pages/user.scss';

type UserPageProps = {
  name: ILoginState['name'];
  fetching: IUserState['fetching'];
  error: IUserState['error'];
};

const UserPage: React.FunctionComponent<UserPageProps> = ({ name, fetching, error }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!name) {
      history.replace('/');
      return;
    }

    if (error) {
      history.replace(`/?error=${encodeURIComponent((error as any).message || 'Error occurred')}`);
      return;
    }

    dispatch(userRequested());
  }, [dispatch, history, name, error]);

  return (
    <Layout title={`${name}`}>
      <div className="fill-height">
        {fetching ? (
          <PageLoading disableShrink={true} />
        ) : (
          <Box className="user-data" mb={10}>
            <div className="playlists">
              <PlaylistsSection />
            </div>
            <div className="artists">
              <ArtistsSection />
            </div>
            <div className="tracks">
              <TracksSection />
            </div>
          </Box>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    name: state.loginReducer.name,
    error: state.userReducer.error,
    fetching: state.userReducer.fetching,
  };
};

export default connect(mapStateToProps)(UserPage);
