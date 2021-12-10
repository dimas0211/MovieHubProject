import React from 'react';
import errorImage from '../../assets/images/404.gif';

const CN = 'not-found-page';

const NotFoundPage = () => (
  <div className={`${CN}__wrapper`}>
    <img src={errorImage} alt="errorImg" className={`${CN}__image`} />
    <h3 className={`${CN}__title`}>404 page not found</h3>
    <p className={`${CN}__message`}>We are sorry but the page you are looking for does not exist.</p>
  </div>
);

export default NotFoundPage;
