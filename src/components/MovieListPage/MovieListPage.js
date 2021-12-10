/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import cx from 'classnames';
import autoBind from 'auto-bind';
import MovieMainItemCard from '../MovieMainItemCard';
import MovieListPagination from '../MovieListPagination';
import { TwoCarouselsComponent } from '../TwoCarouselsComponent';
import { LARGE_SCREEN, MOBILE, TABLET } from '../../constants/configurations';
import Loader from '../Loader';

import './MovieListPage.scss';
import EmptyListComponent from '../ EmptyListComponent';

const CN = 'movie-list-page';

class MovieListPage extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderMovieList() {
    const {
      genres,
      movieList,
      routingConfig,
      getDataService,
      viewport: { device },
      setOneMovieType,
      movieOrShow,
      setFiltrationParams,
      isAuthenticated
    } = this.props;

    return movieList.getMovieList().map((movieData) => (
      <MovieMainItemCard
        className={`${CN}__movie-item-card`}
        device={device}
        genres={genres}
        getDataService={getDataService}
        id={movieData.getId()}
        key={movieData.getId()}
        movieData={movieData}
        movieOrShow={movieOrShow}
        routingConfig={routingConfig}
        setFiltrationParams={setFiltrationParams}
        setOneMovieType={setOneMovieType}
        isAuthenticated={isAuthenticated}
      />
    ));
  }

  render() {
    const {
      movieList,
      loading,
      viewport: { device },
      location: { pathname }
    } = this.props;
    const isLargeScreen = device === LARGE_SCREEN;
    const isMobile = device === MOBILE;
    const isTablet = device === TABLET;
    const isSearchPage = pathname.includes('/search');

    return (loading) ? (
      <div className={cx(`${CN}__loader-wrapper`, isMobile && `${CN}__loader-wrapper-mobile`)}>
        <Loader />
        <h2>Loading...</h2>
      </div>
    ) : (
      <div className={cx(
        CN,
        !isSearchPage && (
          (isTablet && `${CN}-with-filters__tablet`) || (isMobile && `${CN}-with-filters__mobile`) || `${CN}-with-filters`)
      )}
      >
        <TwoCarouselsComponent />
        {isSearchPage && <h2 className={`${CN}__search-results`}>Search Results:</h2>}
        {movieList.results.size ? (
          <div className={cx(`${CN}__movie-list-wrapper`, isLargeScreen && `${CN}__movie-list-wrapper-large-screen`)}>
            {this.renderMovieList() }
          </div>
        ) : <EmptyListComponent />}
        <MovieListPagination
          pagesCount={movieList.getNumberOfPages()}
          {...this.props}
        />
      </div>
    );
  }
}

export default MovieListPage;
