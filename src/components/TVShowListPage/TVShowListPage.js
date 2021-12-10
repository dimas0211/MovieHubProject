import React, { Component } from 'react';
import autoBind from 'auto-bind';
import MovieListPage from '../MovieListPage/MovieListPage';

class TVShowListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    autoBind(this);
  }

  componentDidMount() {
    this.loadShowList();
  }

  componentDidUpdate(prevProps) {
    const {
      filtrationQueryParams,
      getDataService,
      apiCallConfig: { tvShow },
      getMoviesSuccess,
      getMoviesError
    } = this.props;

    if (prevProps.filtrationQueryParams && prevProps.filtrationQueryParams !== filtrationQueryParams) {
      getDataService
        .getMovieList(1, tvShow, ...filtrationQueryParams)
        .then((data) => getMoviesSuccess(data))
        .catch((error) => getMoviesError(error));
    }
  }

  loadShowList() {
    const {
      getDataService,
      apiCallConfig: { tvShowGenres, tvShow },
      getMoviesSuccess,
      getMoviesError,
      getGenresSuccess,
      getGenresError
    } = this.props;

    this.setState({ loading: true });

    getDataService
      .getGenres(tvShowGenres)
      .then((data) => {
        this.setState({ loading: false });
        getGenresSuccess(data);
      })
      .catch((error) => getGenresError(error));

    getDataService
      .getMovieList(1, tvShow)
      .then((data) => {
        this.setState({ loading: false });
        getMoviesSuccess(data);
      })
      .catch((error) => getMoviesError(error));
  }

  render() {
    const { apiCallConfig: { tvShow } } = this.props;
    const { loading } = this.state;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MovieListPage {...this.props} loading={loading} movieOrShow={tvShow} />;
  }
}

export default TVShowListPage;
