import React from 'react';

import { navigate } from 'gatsby';
import { useDispatch } from 'react-redux';
import { Avatar, Box, Link } from '@material-ui/core';

import { logout } from '../state/actions/login';

type UserHeaderProps = {
  name: string;
  image?: {
    width?: number;
    height?: number;
    url: string;
  };
};

const UserHeader: React.FunctionComponent<UserHeaderProps> = ({ name, image }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    typeof window !== 'undefined' && navigate('/');
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

export default UserHeader;
