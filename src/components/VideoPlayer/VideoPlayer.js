import React from 'react';
import cx from 'classnames';

import './VideoPlayer.scss';

const CN = 'video-player';

const VideoPlayer = ({ youtubeId, title, isMobile }) => (
  <div className={cx(`${CN}__wrapper`, isMobile && `${CN}__mobile-wrapper`)}>
    <iframe
      className={CN}
      src={`https://www.youtube.com/embed/${youtubeId}`}
      title={title}
    />
  </div>
);

export default VideoPlayer;
