import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withSnackbar } from 'notistack';
import connectWithViewport from '../../services/connectWithViewport';

import DefaultLayout from './DefaultLayout';
import connectWithIoC from '../../services/connectWithIoC';
import { setUserAuthenticated, setUserUnauthenticated } from '../../actions/actionsAuthentication';

const mapStateToProps = ({
  ApiReducer: { error, movieList, genres },
  authenticationReducer: { isAuthenticated, authTime }
}) => ({
  movies: movieList,
  error,
  genres,
  isAuthenticated,
  authTime
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setUserAuthenticated,
  setUserUnauthenticated
}, dispatch);

export const DefaultLayoutContainer = compose(
  connectWithIoC(['routingConfig', 'loginService']),
  connectWithViewport(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withSnackbar(DefaultLayout));
