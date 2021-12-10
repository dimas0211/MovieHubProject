import React from 'react';
import cx from 'classnames';
import Accordeon from '../Accordeon/Accordeon';
import { LARGE_SCREEN, MOBILE } from '../../constants/configurations';
import StarRating from '../StarRating';
import VideoPlayerBar from '../VideoPlayerBar';

const CN = 'movie-page';
const MovieItem = (props) => {
  const {
    movie: {
      id,
      title,
      originTitle,
      movieVote,
      voteCount,
      homePage,
      budget,
      overview,
      poster,
      movieYear,
      prodCompanies,
      releaseDate,
      prodCountries,
      languages,
      seasons,
      duration,
      genres
    },
    videos,
    viewport: { device },
    location: { pathname },
    routingConfig: { tvShow },
    isAuthenticated,
    movieOrShow,
    getDataService,
    enqueueSnackbar
  } = props;
  const isMobile = device === MOBILE;
  const isLargeScreen = device === LARGE_SCREEN;
  const isTVShow = pathname.includes(tvShow.showPath);

  const renderGenres = () => (genres.map((el) => <span className={`${CN}__genre-item`} key={el.id}>{el.name}</span>));

  const renderStarRating = () => {
    const { movie } = props;
    const starsNumber = 5;
    const starWidth = '25px';
    const starSpacing = '5';

    return (
      <StarRating
        className={`${CN}__rating-starts`}
        getDataService={getDataService}
        id={id}
        isAuthenticated={isAuthenticated}
        movie={movie}
        movieOrShow={movieOrShow}
        name="rating"
        numberOfStars={starsNumber}
        starSpacing={starSpacing}
        starWidth={starWidth}
        enqueueSnackbar={enqueueSnackbar}
      />
    );
  };

  const renderSeasons = () => seasons.map(({ name }) => (
    <div className={`${CN}__info-item-container`} key={id}>
      <Accordeon
        CN={CN}
        id={id}
        name={name}
        overview={overview}
        poster={poster}
      >
        <div className={cx(`${CN}__accordion-item-container`, isMobile && `${CN}__accordion-info-container-mobile`)}>
          <img
            alt="season-poster"
            className={`${CN}__season-poster`}
            src={poster}
          />
          <span className={cx(`${CN}__season-info`, isMobile && `${CN}__season-info-container-mobile`)}>{overview}</span>
        </div>
      </Accordeon>
    </div>
  ));

  const renderInfoItem = (infoTitle, infoValue, className) => (
    <p className={`${CN}__info-item-container`}>
      <span className={`${CN}__info-item-name`}>{`${infoTitle}: `}</span>
      <span className={`${CN}__info-item-value ${className}`}>
        {typeof infoValue === 'function' ? infoValue() : infoValue}
      </span>
    </p>
  );

  return (
    <div className={`${CN}__wrapper`}>
      <div className={`${CN}__main-title-container`}>
        <h2 className={`${CN}__main-title`}>{title}</h2>
        <hr className={`${CN}__main-title-underline`} />
      </div>
      <div className={cx(`${CN}__main-info-container`, isMobile && `${CN}__mobile-main-info-container`)}>
        <div className={cx(`${CN}__main-poster-container`, isMobile && `${CN}__mobile-main-poster-container`)}>
          <img
            alt="movie-poster"
            className={`${CN}__poster`}
            src={poster}
          />
        </div>
        <div className={cx(`${CN}__info-container`, isMobile && `${CN}__mobile-info-container`)}>
          {renderInfoItem('Original Title', originTitle, 'original-title')}
          {renderInfoItem('Year', movieYear, 'release-year')}
          {!!prodCountries && renderInfoItem('Country', prodCountries, 'country')}
          {renderInfoItem('Company', prodCompanies, 'company')}
          {renderInfoItem('Genre', renderGenres, 'genre')}
          {renderInfoItem('Release Date', releaseDate, 'release-year')}
          {renderInfoItem('Duration', `${duration} minutes`, 'duration')}
          {renderInfoItem('Language', languages, 'languages')}
          <div className={`${CN}__info-item-container`}>
            {renderStarRating()}
          </div>
          <div className={`${CN}__rating-info`}>
            {`Rating: ${movieVote}/10 (${voteCount} Votes)`}
          </div>
          {!!budget && renderInfoItem('Budget $', budget, 'budget')}
          {!!homePage && (
            <p className={`${CN}__info-item-container`}>
              <span className={`${CN}__info-item-name`}>Homepage: </span>
              <a className={`${CN}__info-item-value homepage`} href={homePage}>
                {homePage}
              </a>
            </p>
          )}
        </div>
      </div>
      <div className={`${CN}__main-content-container`}>
        <div className={`${CN}__about-container`}>
          <h4 className={`${CN}__about-title`}>
              About
            {' '}
            {title}
          </h4>
          <p className={`${CN}__about`}>
            {overview}
          </p>
        </div>

      </div>
      <div className={cx(
        `${CN}__seasons-with-video-container`,
        isMobile && `${CN}__seasons-with-video-container-mobile`,
        isLargeScreen && `${CN}__seasons-with-video-container-large-screen`
      )}
      >
        {!!seasons.size && (
          <div className={cx(`${CN}__seasons-container`, isLargeScreen && `${CN}__seasons-container-show`)}>
            <p className={`${CN}__info-item-name`}>Seasons : </p>
            <div className={`${CN}__info-item-value budget`}>
              {renderSeasons(isMobile)}
            </div>
          </div>
        )}
        <div className={cx(`${CN}__video-tabs-wrapper`, isLargeScreen && isTVShow && `${CN}__video-tabs-wrapper-show`)}>
          <VideoPlayerBar CN={CN} isMobile={isMobile} videos={videos} />
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
