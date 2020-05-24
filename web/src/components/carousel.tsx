import React from 'react';

import { Box } from '@material-ui/core';
import MultiCarousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Carousel: React.FunctionComponent = ({ children }) => {
  const items = [
    {
      image: 'https://i.picsum.photos/id/1/300/200.jpg',
      id: 1,
      name: 'Playlist',
      author: 'Roman',
    },
  ];

  return (
    <MultiCarousel
      // swipeable={true}
      // draggable={true}
      // showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
      // autoPlaySpeed={1000}
      // keyBoardControl={true}
      // customTransition="all .5"
      // transitionDuration={500}
      // containerClass="carousel-container"
      // removeArrowOnDeviceType={['tablet', 'mobile']}
      deviceType={'desktop'}
      // dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {/* {children} */}

      <div style={{ width: '100%' }}>
        <div style={{ height: 300, width: 300 }}>
          <div
            className="image"
            style={{
              width: 300,
              height: 300,
              backgroundImage: 'url(https://i.picsum.photos/id/1/300/200.jpg)',
            }}
          ></div>
        </div>
        <div>1</div>
      </div>
      <div style={{ width: '100%' }}>
        <div style={{ height: 300, width: 300 }}>
          <div
            className="image"
            style={{
              width: 300,
              height: 300,
              backgroundImage: 'url(https://i.picsum.photos/id/2/300/200.jpg)',
            }}
          ></div>
        </div>
        <div>1</div>
      </div>
      <div style={{ width: '100%' }}>
        <div style={{ height: 300, width: 300 }}>
          <div
            className="image"
            style={{
              width: 300,
              height: 300,
              backgroundImage: 'url(https://i.picsum.photos/id/3/300/200.jpg)',
            }}
          ></div>
        </div>
        <div>1</div>
      </div>
      {/* {items.map((item, i) => (
       
      ))} */}
    </MultiCarousel>
  );
};

export default Carousel;
