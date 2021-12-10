import React from 'react';

import './MainPageSkeleton.scss';

const CN = 'skeleton';

const HeaderSkeleton = () => (
  <div className={CN}>
    <div className={`${CN}__heading`}>
      <div className="content">
        <div className={`${CN}__dropdowns col-4`}>
          <div className={`${CN}__item`} />
          <div className={`${CN}__item`} />
          <div className={`${CN}__item`} />
        </div>

        <div className={`${CN}__shipping col-4`}>
          <div className={`${CN}__item`} />
        </div>

        <div className={`${CN}__links col-4`}>
          <div className={`${CN}__item`} />
          <div className={`${CN}__item`} />
          <div className={`${CN}__item`} />
          <div className={`${CN}__item`} />
        </div>

      </div>

      <div className={`${CN}__navigation`}>
        <div className="content">
          <div className={`${CN}__title`} />
          <div className="container">
            <div className={`${CN}__icon`} />
            <div className={`${CN}__item`} />
          </div>
          <div className="container">
            <div className={`${CN}__icon`} />
            <div className={`${CN}__item`} />
          </div>
        </div>
      </div>
    </div>

    <div className={`${CN}__carousel`}>
      <div className={`${CN}__carousel-item`} />
      <div className={`${CN}__carousel-item`} />
      <div className={`${CN}__carousel-item`} />
      <div className={`${CN}__carousel-item`} />
      <div className={`${CN}__carousel-item`} />
      <div className={`${CN}__carousel-item`} />
      <div className={`${CN}__carousel-item`} />
    </div>
  </div>
);

export default HeaderSkeleton;
