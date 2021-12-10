import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import connectWithViewport from '../../services/connectWithViewport';
import connectWithIoC from '../../services/connectWithIoC';

import TwoCarouselsComponent from './TwoCarouselsComponent';
import {
  getGenresError,
  getNewMoviesSuccess,
  getNewMoviesError,
  getPopularMoviesSuccess,
  getPopularMoviesError
} from '../../actions/actionsAPIcall';

const mapStateToProps = ({ ApiReducer: { error, newMovies, popularMovies } }) => ({
  error,
  newMovies,
  popularMovies
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getGenresError,
  getNewMoviesSuccess,
  getNewMoviesError,
  getPopularMoviesSuccess,
  getPopularMoviesError
}, dispatch);

export const TwoCarouselsComponentContainer = compose(
  connectWithIoC(['getDataService', 'apiCallConfig', 'routingConfig']),
  connectWithViewport(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TwoCarouselsComponent);
