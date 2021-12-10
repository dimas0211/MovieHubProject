import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withSnackbar } from 'notistack';
import connectWithViewport from '../../services/connectWithViewport';
import connectWithIoC from '../../services/connectWithIoC';

import MovieItemPage from './MovieItemPage';
import * as movieActions from '../../actions/actionsAPIcall';

const mapStateToProps = ({
  ApiReducer: {
    error,
    movie,
    genresList,
    videos,
    movieOrShow
  },
  authenticationReducer: { isAuthenticated }
}) => ({
  error,
  movie,
  genres: genresList.genres,
  videos,
  movieOrShow,
  isAuthenticated
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...movieActions
}, dispatch);

export const MovieItemPageContainer = compose(
  connectWithIoC(['getDataService', 'apiCallConfig', 'routingConfig']),
  connectWithViewport(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withSnackbar(MovieItemPage));
