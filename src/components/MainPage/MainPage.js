import React, { Component } from 'react';
import autoBind from 'auto-bind';
import { MovieListPage } from '../MovieListPage';
import * as NOTIFICATION_DATA from '../../constants/notificationData';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    autoBind(this);
  }

  componentDidMount(props) {
    this.loadMovieList(props);
  }

  componentDidUpdate(prevProps) {
    const {
      filtrationQueryParams,
      getDataService,
      apiCallConfig: { movie },
      getMoviesSuccess,
      enqueueSnackbar
    } = this.props;
    const { DATA_NOT_LOADED } = NOTIFICATION_DATA;

    if (prevProps.filtrationQueryParams && prevProps.filtrationQueryParams !== filtrationQueryParams) {
      getDataService
        .getMovieList(1, movie, ...filtrationQueryParams)
        .then((data) => getMoviesSuccess(data))
        .catch(() => enqueueSnackbar(DATA_NOT_LOADED.message, DATA_NOT_LOADED.params));
    }
  }

  loadMovieList() {
    const {
      getDataService,
      getMoviesSuccess,
      getGenresSuccess,
      enqueueSnackbar
    } = this.props;
    const { DATA_NOT_LOADED } = NOTIFICATION_DATA;

    this.setState({ loading: true });

    getDataService
      .getGenres()
      .then((data) => {
        this.setState({ loading: false });
        getGenresSuccess(data);
      })
      .catch(() => enqueueSnackbar(DATA_NOT_LOADED.message, DATA_NOT_LOADED.params));

    getDataService
      .getMovieList(1)
      .then((data) => {
        this.setState({ loading: false });
        getMoviesSuccess(data);
      })
      .catch(() => enqueueSnackbar(DATA_NOT_LOADED.message, DATA_NOT_LOADED.params));
  }

  render() {
    const { apiCallConfig: { movie } } = this.props;
    const { loading } = this.state;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MovieListPage movieOrShow={movie} loading={loading} {...this.props} />;
  }
}

export default MainPage;
