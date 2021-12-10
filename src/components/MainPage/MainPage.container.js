import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { bindActionCreators, compose } from 'redux';
import connectWithViewport from '../../services/connectWithViewport';
import connectWithIoC from '../../services/connectWithIoC';

import MainPage from './MainPage';
import {
  getMoviesSuccess,
  getMoviesError,
  getGenresSuccess,
  getGenresError

} from '../../actions/actionsAPIcall';

const mapStateToProps = ({
  ApiReducer: {
    error,
    movieListInfo,
    genresList
  },
  setFiltrationParamsReducer
}) => ({
  error,
  movieList: movieListInfo,
  genres: genresList.genres,
  filtrationQueryParams: setFiltrationParamsReducer.filtrationQueryParams
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMoviesSuccess,
  getMoviesError,
  getGenresSuccess,
  getGenresError
}, dispatch);

export const MainPageContainer = compose(
  connectWithIoC(['getDataService', 'apiCallConfig']),
  connectWithViewport(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withSnackbar(MainPage));
