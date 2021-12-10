import React, { Component } from 'react';
import autoBind from 'auto-bind';
import cx from 'classnames';
import MovieItem from '../MovieItem';
import Loader from '../Loader';
import { MOBILE } from '../../constants/configurations';
import * as NOTIFICATION_DATA from '../../constants/notificationData';

import './MovieItemPage.scss';

const CN = 'movie-page';

class MovieItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    autoBind(this);
  }

  componentDidMount() {
    const {
      getDataService,
      getOneMovieSuccess,
      enqueueSnackbar,
      getVideosSuccess,
      match: { params }
    } = this.props;
    const { DATA_NOT_LOADED } = NOTIFICATION_DATA;

    this.setState({ loading: true });

    getDataService
      .getOneMovie(params.id, this.returnMoviePath())
      .then((data) => {
        this.setState({ loading: false });
        getOneMovieSuccess(data);
      })
      .catch(() => enqueueSnackbar(DATA_NOT_LOADED.message, DATA_NOT_LOADED.params));

    getDataService
      .getVideos(params.id, this.returnMoviePath())
      .then((data) => {
        this.setState({ loading: false });
        getVideosSuccess(data);
      })
      .catch(() => enqueueSnackbar(DATA_NOT_LOADED.message, DATA_NOT_LOADED.params));
  }

  componentWillUnmount() {
    const { clearOneMovie } = this.props;

    clearOneMovie && clearOneMovie();
  }

  returnMoviePath() {
    const { match: { path }, routingConfig: { movie } } = this.props;

    return (path.includes(movie.moviePath)) && movie.moviePath;
  }

  render() {
    const { loading } = this.state;
    const { device } = this.props;
    const isMobile = device === MOBILE;

    return (loading) ? (
      <div className={cx(`${CN}__loader-wrapper`, isMobile && `${CN}__loader-wrapper-mobile`)}>
        <Loader />
        <h2>Loading...</h2>
      </div>
    ) : (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <MovieItem {...this.props} />
    );
  }
}

export default MovieItemPage;
