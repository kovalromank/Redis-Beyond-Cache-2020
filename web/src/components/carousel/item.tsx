import React from 'react';

import { Grid, Typography, CardContent, Box } from '@material-ui/core';

import MediaButton from './media-button';

type CarouselItemProps = {
  image?: string;
  title?: string;
  subtitle?: string;
  spotifyURI: string;
  imagePlaceholder: React.ReactElement;
};

const CarouselItem: React.FunctionComponent<CarouselItemProps> = ({
  image,
  title,
  subtitle,
  imagePlaceholder,
  spotifyURI,
}) => {
  return (
    <div className="wrapper">
      <div className="item">
        {image ? (
          <div className="image" style={{ backgroundImage: `url('${image}')` }}></div>
        ) : (
          <div className="image">
            <Grid
              container
              className="placeholder fill-height"
              justify="center"
              alignContent="center"
            >
              {imagePlaceholder}
            </Grid>
          </div>
        )}
        <CardContent>
          <Grid container wrap="nowrap" alignItems="center">
            <Grid item>
              <Box pr={2}>
                <Grid container alignContent="center" className="clickable">
                  <MediaButton spotifyURI={spotifyURI} />
                </Grid>
              </Box>
            </Grid>
            <Grid item className="grow overflow-hidden">
              <div>
                {title && (
                  <Typography className="text" variant="h6">
                    {title}
                  </Typography>
                )}
                {subtitle && <Typography className="text">{subtitle}</Typography>}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </div>
  );
};

export default CarouselItem;
