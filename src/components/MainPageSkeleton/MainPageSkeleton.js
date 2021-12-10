import React from 'react';

import HeaderSkeleton from './HeaderSkeleton';

import './MainPageSkeleton.scss';

const CN = 'skeleton';

const MainPageSkeleton = () => (
  <div className={CN}>
    <HeaderSkeleton />

    <div className={`${CN}__main-content-wrapper`}>
      <div className={`${CN}__filtration`} />
      <div className={`${CN}__movie-cards-wrapper`}>
        <div className={`${CN}__movie-item`} />
        <div className={`${CN}__movie-item`} />
        <div className={`${CN}__movie-item`} />
      </div>
    </div>
  </div>
);

export default MainPageSkeleton;
