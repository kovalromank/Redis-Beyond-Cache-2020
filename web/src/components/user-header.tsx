import React from 'react';

import { connect, useDispatch } from 'react-redux';
import { Avatar, Box } from '@material-ui/core';

import { logout } from '../state/actions/login';
import { IState } from '../state/createStore';
import { ILoginState } from '../state/reducers/login';

type UserHeaderProps = {
  name: ILoginState['name'];
  image: ILoginState['image'];
};

const UserHeader: React.FunctionComponent<UserHeaderProps> = ({ name, image }) => {
  const dispatch = useDispatch();

  if (!name) return null;

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Box textAlign="right" mr={2}>
        <Box fontWeight="h6.fontWeight" fontSize="h6.fontSize">
          {name}
        </Box>
        <div>
          <span className="clickable" onClick={onLogout}>
            Logout
          </span>
        </div>
      </Box>
      {image && <Avatar alt="Profile picture" src={image.url} />}
    </>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    name: state.loginReducer.name,
    image: state.loginReducer.image,
  };
};

export default connect(mapStateToProps)(UserHeader);
