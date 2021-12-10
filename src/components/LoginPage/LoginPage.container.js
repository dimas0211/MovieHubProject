import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withSnackbar } from 'notistack';
import connectWithViewport from '../../services/connectWithViewport';
import connectWithIoC from '../../services/connectWithIoC';

import LoginPage from './LoginPage';
import { setUserAuthenticated, setUserUnauthenticated } from '../../actions/actionsAuthentication';

const mapStateToProps = ({ authenticationReducer: { isAuthenticated } }) => ({ isAuthenticated });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setUserAuthenticated,
  setUserUnauthenticated
}, dispatch);

export const LoginPageContainer = compose(
  connectWithIoC(['getDataService', 'routingConfig', 'apiCallConfig', 'loginService']),
  connectWithViewport(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withSnackbar(LoginPage));
