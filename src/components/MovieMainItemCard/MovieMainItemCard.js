import React from 'react';
import cx from 'classnames';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import { LARGE_SCREEN, MOBILE } from '../../constants/configurations';

import './MovieMainItemCard.scss';

const CN = 'movie-card';

const MovieMainItemCard = ({
  movieData,
  genres,
  device,
  movieOrShow,
  id,
  setFiltrationParams,
  routingConfig: { view }
}) => {
  const isMobile = device === MOBILE;
  const isLargeScreen = device === LARGE_SCREEN;

  const filterByGenre = (e) => {
    e.preventDefault();
    const genreValue = e.target.innerText;
    const targetGenre = genres.find((genre) => genre.name === genreValue);

    setFiltrationParams && setFiltrationParams({ with_genres: targetGenre.id });
  };

  const getGenres = (ids) => {
    if (!ids || !ids.length) {
      return 'No genre';
    }
    const genresStrArray = genres.filter((genre) => ids.includes(genre.id));

    return (!genresStrArray.length && genresStrArray.map((el) => el && (
      <div className={`${CN}__genre`} key={el.name}>
        <span className={`${CN}__genre-item`} key={el.name} onClick={filterByGenre}>
          {el.name}
        </span>
      </div>
    )));
  };

  const renderStarRating = () => {
    const starsNumber = 5;
    const starWidth = '15px';
    const starSpacing = '0';

    return (
      <StarRatings
        className={`${CN}__rating-starts`}
        name="rating"
        numberOfStars={starsNumber}
        rating={movieData.movieVote / 2}
        starDimension={starWidth}
        starRatedColor="gold"
        starSpacing={starSpacing}
      />
    );
  };

  return (
    <Link className={cx(isLargeScreen && `${CN}__wrapper-large-screen`, 'page-link')} to={generatePath(`${movieOrShow}${view}`, { id })}>
      <div className={cx(`${CN}__wrapper`, isMobile && `${CN}__wrapper-mobile`)}>
        <div className={`${CN}__image-container`}>
          <img
            alt="movie-poster"
            className={cx(`${CN}__image`, isLargeScreen && `${CN}__image-large-screen`)}
            src={movieData.poster}
          />
        </div>
        <div className={cx(`${CN}__info-container`, isMobile && `${CN}__info-container-mobile`)}>
          <div className={`${CN}__title-container`}>
            <h4 className={`${CN}__movie-title`}>{movieData.title}</h4>
            <h5 className={`${CN}__movie-title-native-lang`}>{movieData.originalTitle}</h5>
          </div>
          <div className={`${CN}__rating-genre-container`}>
            {renderStarRating()}
            <div className={`${CN}__rating-info`}>
              {`Rating: ${movieData.movieVote}/10 | Votes: ${movieData.movieVoteCount}`}
            </div>
            <div className={`${CN}__year-genre`}>
              {`${movieData.releaseDate} | `}
              {getGenres(movieData.movieGeresId)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieMainItemCard;

