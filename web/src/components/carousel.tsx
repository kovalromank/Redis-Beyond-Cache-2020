import React from 'react';

import ReactMultiCarousel, { ButtonGroupProps } from 'react-multi-carousel';
import { Grid, IconButton, Container, Typography, Box, useMediaQuery } from '@material-ui/core';
import ChevronLeft from 'mdi-material-ui/ChevronLeft';
import ChevronRight from 'mdi-material-ui/ChevronRight';

import 'react-multi-carousel/lib/styles.css';
import '../scss/components/carousel.scss';

const responsive = {
  xl: {
    breakpoint: { max: 1920, min: 1600 },
    items: 4,
  },
  lg: {
    breakpoint: { max: 1600, min: 1280 },
    items: 3,
  },
  md: {
    breakpoint: { max: 1280, min: 960 },
    items: 2,
  },
  xs: {
    breakpoint: { max: 960, min: 0 },
    items: 1,
  },
};

const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = ({ next, previous }) => {
  return (
    <Container>
      <Grid container justify="flex-end">
        <IconButton onClick={previous} aria-label="previous slide">
          <ChevronLeft fontSize="large" />
        </IconButton>
        <IconButton onClick={next} aria-label="next slide">
          <ChevronRight fontSize="large" />
        </IconButton>
      </Grid>
    </Container>
  );
};

type CarouselProps = {
  title: React.ReactElement;
};

const Carousel: React.FunctionComponent<CarouselProps> = ({ title, children }) => {
  const sm = useMediaQuery('(min-width:500px)');

  return (
    <Box py={5}>
      <Container>
        <Box mb={2}>
          <Typography variant="h2">{title}</Typography>
        </Box>
      </Container>
      <ReactMultiCarousel
        className="carousel"
        responsive={responsive}
        showDots={false}
        arrows={false}
        // draggable={false}
        // swipeable={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
        infinite={true}
        centerMode={sm}
      >
        {children}
      </ReactMultiCarousel>
    </Box>
  );
};

export default Carousel;
