import React from 'react';

// import PlayCircleOutline from 'mdi-material-ui/PlayCircleOutline';

import { Grid, Typography, CardContent } from '@material-ui/core';

type CarouselItemProps = {
  image?: string;
  title?: string;
  subtitle?: string;
  imagePlaceholder: React.ReactElement;
};

const CarouselItem: React.FunctionComponent<CarouselItemProps> = ({
  image,
  title,
  subtitle,
  imagePlaceholder,
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
            {/* <Grid item>
              <IconButton aria-label="play">
                <PlayCircleOutline />
              </IconButton>
            </Grid> */}
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
