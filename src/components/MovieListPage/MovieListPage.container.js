import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import connectWithViewport from '../../services/connectWithViewport';

import MovieListPage from './MovieListPage';
import {
  getMoviesSuccess,
  getMoviesError,
  setOneMovieType
} from '../../actions/actionsAPIcall';
import { setFiltrationParams } from '../../actions/setFiltrationParams';
import connectWithIoC from '../../services/connectWithIoC';

const mapStateToProps = ({
  ApiReducer: {
    error,
    movieListInfo,
    genresList,
    oneMovieId
  },
  setFiltrationParamsReducer: { filtrationQueryParams },
  setSearchModeReducer: {
    searchQuery,
    searchMode
  },
  authenticationReducer: { isAuthenticated }
}) => ({
  error,
  movieList: movieListInfo,
  genres: genresList.genres,
  filtrationQueryParams,
  query: searchQuery,
  searchMode,
  oneMovieId,
  isAuthenticated
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMoviesSuccess,
  getMoviesError,
  setOneMovieType,
  setFiltrationParams
}, dispatch);

export const MovieListPageContainer = compose(
  connectWithViewport(),
  connectWithIoC(['getDataService', 'routingConfig', 'apiCallConfig']),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MovieListPage);
