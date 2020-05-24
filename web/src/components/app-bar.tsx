import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { Toolbar, AppBar } from '@material-ui/core';

import { ILoginState } from '../state/reducers/login';
import Spacer from './spacer';
import UserHeader from './user-header';

type AppBarProps = {
  name?: string;
  image?: {
    width?: number;
    height?: number;
    url: string;
  };
};

const DefaultAppBar: React.FunctionComponent<AppBarProps> = ({ name, image }) => {
  // TODO: Use a custom logo
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "Spotify_Logo_RGB_Black.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          # fixed(width: 125, height: 125) {
          fixed(height: 40) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `);

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar>
        <Img fixed={data.file.childImageSharp.fixed} />
        <Spacer />
        {name && <UserHeader name={name} image={image} />}
      </Toolbar>
    </AppBar>
  );
};

export default DefaultAppBar;
