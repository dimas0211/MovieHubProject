import React, { Component } from 'react';
import autoBind from 'auto-bind';
import ls from 'local-storage';
import { Button, InputBase, withStyles } from '@material-ui/core';
import downArrow from '../../assets/images/down-arrow.png';
import * as NOTIFICATION_DATA from '../../constants/notificationData';

import './LoginPage.scss';

const CN = 'login-page';
const GUEST = 'Guest';
const USER = 'User';

const StyledMainButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    width: 250,
    height: 50,
    padding: '0',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '& > span': {
      color: 'white'
    }
  }
})(Button);

const StyledSecondaryButton = withStyles({
  root: {
    display: 'inline-block',
    background: 'linear-gradient(45deg, #59ced9 30%, #c6d959 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    width: 200,
    height: 35,
    padding: 0,
    margin: '10px auto',
    boxShadow: '0 3px 5px 2px rgba(160, 255, 161, .3)',
    '& > span': {
      color: 'white'
    }
  }
})(Button);

const StyledInput = withStyles({
  root: {
    color: 'white',
    border: '1px solid #404040',
    borderRadius: 3,
    margin: 5,
    padding: '0 5px',
    backgroundColor: '#353b48'
  }
})(InputBase);

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderActivateGuestSessionBtn: false,
      renderActivateUserSessionBtn: false,
      showLoginForm: false,
      username: '',
      password: '',
      expirationDate: null
    };

    autoBind(this);
  }

  componentDidMount() {
    const { isAuthenticated, history, routingConfig: { main } } = this.props;

    isAuthenticated && history.push(main);
  }

  getSessionId() {
    const {
      loginService,
      setUserAuthenticated,
      history,
      routingConfig,
      enqueueSnackbar
    } = this.props;
    const { username, expirationDate } = this.state;
    const { LOGIN_SUCCESS, LOGIN_ERROR, NOT_AUTHORIZED, REGULAR_ERROR } = NOTIFICATION_DATA;

    loginService
      .createSessionId()
      .then((data) => {
        if (data.success) {
          ls.set('sessionId', data.session_id);
          setUserAuthenticated && setUserAuthenticated(username, expirationDate);
          history.push(routingConfig.main);
          enqueueSnackbar(LOGIN_SUCCESS.message, LOGIN_SUCCESS.params);
        } else {
          enqueueSnackbar(LOGIN_ERROR.message, LOGIN_ERROR.params);
        }
      })
      .catch((error) => {
        if (error.response.data.status_message === 'Session denied.') {
          enqueueSnackbar(NOT_AUTHORIZED.message, NOT_AUTHORIZED.params);

          return;
        }
        enqueueSnackbar(REGULAR_ERROR.message, REGULAR_ERROR.params);
      });
  }

  userLogin() {
    const { loginService, enqueueSnackbar } = this.props;
    const { username, password } = this.state;
    const { LOGIN_INCORRECT_CREDENTIALS, ERROR_TYPES, notificationParams } = NOTIFICATION_DATA;

    loginService
      .loginAsUser(username, password)
      .then((data) => {
        if (data.success) {
          this.setState({
            renderActivateUserSessionBtn: true,
            expirationDate: data.expires_at
          });
        } else {
          enqueueSnackbar(notificationParams(LOGIN_INCORRECT_CREDENTIALS));
        }
      })
      .catch((error) => enqueueSnackbar(error.response.data.status_message, { variant: ERROR_TYPES.error }));
  }

  showUserInput() {
    const { showLoginForm } = this.state;

    this.setState({
      showLoginForm: !showLoginForm
    });
  }

  handleUsernameInput(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordInput(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginAsGuest() {
    const { apiCallConfig: { loginUrl } } = this.props;
    const requestToken = ls.get('requestToken');

    const redirectPath = `${loginUrl}/${requestToken}`;

    window.open(redirectPath, '_blank');
    this.setState({
      renderActivateGuestSessionBtn: true
    });
  }

  renderLoginForm() {
    const { username, password } = this.state;

    return (
      <div className={`${CN}__form-container`}>
        <span>Please, enter your Movie DB data</span>
        <img alt="arrow" className={`${CN}__button-arrow`} src={downArrow} />
        <div className={`${CN}__input-container`}>
          <StyledInput
            className={`${CN}__search-field`}
            placeholder="Username"
            value={username}
            onChange={this.handleUsernameInput}
          />
          <StyledInput
            className={`${CN}__search-field`}
            placeholder="Password"
            type="password"
            value={password}
            onChange={this.handlePasswordInput}
          />
          <StyledSecondaryButton onClick={this.userLogin}>
          Login
          </StyledSecondaryButton>
        </div>
      </div>
    );
  }

  renderActivationBtn(role) {
    return (
      <div className={`${CN}__secondary-button-container`}>
        <img alt="arrow" className={`${CN}__button-arrow`} src={downArrow} />
        <StyledSecondaryButton onClick={this.getSessionId}>
          {`Start ${role} Session`}
        </StyledSecondaryButton>
      </div>
    );
  }

  render() {
    const {
      renderActivateGuestSessionBtn,
      renderActivateUserSessionBtn,
      showLoginForm
    } = this.state;

    return (
      <div className={`${CN}__wrapper`}>
        <div className={`${CN}__button-container`}>
          <StyledMainButton onClick={this.handleLoginAsGuest}>
              Login as Guest
          </StyledMainButton>
          {renderActivateGuestSessionBtn && this.renderActivationBtn(GUEST)}
        </div>
        <div className={`${CN}__button-container`}>
          <StyledMainButton onClick={this.showUserInput}>
            Login as User
          </StyledMainButton>
          {showLoginForm && (
            <div className={`${CN}__secondary-button-container`}>
              {this.renderLoginForm()}
              {renderActivateUserSessionBtn && this.renderActivationBtn(USER)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LoginPage;
