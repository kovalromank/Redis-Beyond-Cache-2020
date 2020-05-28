import React from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import YouTube, { Options, YouTubeProps } from 'react-youtube';

import EmptyLayout from '../components/layout/empty';
import { IState } from '../state/createStore';
import { IMediaState } from '../state/reducers/media';

import '../scss/pages/view.scss';

type ViewPageProps = {
  media: IMediaState['media'];
};

const ViewPage: React.FunctionComponent<ViewPageProps> = ({ media }) => {
  const history = useHistory();

  const onReady: YouTubeProps['onReady'] = (event) => {
    event.target.mute();
    event.target.seekTo(10);
  };

  const opts: Options = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      color: 'white',
    },
  };

  React.useEffect(() => {
    if (!media) {
      // history.replace('/user');
      return;
    }
  }, [media, history]);

  return (
    <EmptyLayout title={media.track.name} className="view-page">
      <div className="fill-height overflow-hidden view-page">
        <YouTube
          containerClassName="fill-height"
          videoId={media.youtube.id}
          opts={opts}
          onReady={onReady}
        />
      </div>
    </EmptyLayout>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    media: state.mediaReducer.media,
  };
};

export default connect(mapStateToProps)(ViewPage);
