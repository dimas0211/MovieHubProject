import React, { Component } from 'react';
import { MovieListPage } from '../MovieListPage';
import * as NOTIFICATION_DATA from '../../constants/notificationData';

class SearchPage extends Component {
  componentDidMount() {
    this.loadMovieList();
  }

  componentDidUpdate(prevProps) {
    const {
      query,
      getDataService,
      getMoviesSuccess,
      enqueueSnackbar,
      apiCallConfig: { movie },
      match: { params }
    } = this.props;
    const { DATA_NOT_LOADED } = NOTIFICATION_DATA;

    if (prevProps.query !== query) {
      getDataService
        .searchMovies(1, movie, params.query)
        .then((data) => getMoviesSuccess(data))
        .catch(() => enqueueSnackbar(DATA_NOT_LOADED.message, DATA_NOT_LOADED.params));
    }
  }

  componentWillUnmount() {
    const { clearSearchMode, clearSearchQuery } = this.props;

    clearSearchMode && clearSearchMode();
    clearSearchQuery && clearSearchQuery();
  }

  loadMovieList() {
    const {
      getDataService,
      apiCallConfig: { movie },
      getMoviesSuccess,
      getGenresSuccess,
      enqueueSnackbar,
      match: { params }
    } = this.props;
    const { DATA_NOT_LOADED } = NOTIFICATION_DATA;

    getDataService
      .getGenres()
      .then((data) => getGenresSuccess(data))
      .catch(() => enqueueSnackbar(DATA_NOT_LOADED.message, DATA_NOT_LOADED.params));

    getDataService
      .searchMovies(1, movie, params.query)
      .then((data) => getMoviesSuccess(data))
      .catch(() => enqueueSnackbar(DATA_NOT_LOADED.message, DATA_NOT_LOADED.params));
  }

  render() {
    const { apiCallConfig: { movie } } = this.props;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MovieListPage movieOrShow={movie} {...this.props} />;
  }
}

export default SearchPage;
