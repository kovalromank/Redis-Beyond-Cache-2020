import React from 'react';

import { CircularProgress, CircularProgressProps, Grid } from '@material-ui/core';

type PageLoadingProps = {
  disableShrink?: CircularProgressProps['disableShrink'];
};

const PageLoading: React.FunctionComponent<PageLoadingProps> = ({ disableShrink }) => {
  return (
    <Grid container className="fill-height" justify="center" alignContent="center">
      <CircularProgress disableShrink={disableShrink} size={80} thickness={5} />
    </Grid>
  );
};

PageLoading.defaultProps = {
  disableShrink: false,
};

export default PageLoading;
