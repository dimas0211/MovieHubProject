import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withSnackbar } from 'notistack';
import connectWithViewport from '../../services/connectWithViewport';

import Navigation from './Navigation';
import { setUserUnauthenticated } from '../../actions/actionsAuthentication';
import connectWithIoC from '../../services/connectWithIoC';

const mapStateToProps = ({
  ApiReducer: { error, movieListInfo, genresList },
  setFiltrationParamsReducer: { filtrationQueryParams },
  authenticationReducer: { isAuthenticated, userName }
}) => ({
  error,
  movieList: movieListInfo,
  genres: genresList.genres,
  filtrationQueryParams,
  isAuthenticated,
  userName
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setUserUnauthenticated
}, dispatch);

export const NavigationContainer = compose(
  connectWithIoC(['loginService']),
  connectWithViewport(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withSnackbar(Navigation));
