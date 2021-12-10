/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import autoBind from 'auto-bind';
import cx from 'classnames';
import ls from 'local-storage';
import { Button, withStyles } from '@material-ui/core';

import { Header } from '../Header';
import { DESKTOP, LARGE_SCREEN, MOBILE } from '../../constants/configurations';
import * as NOTIFICATION_DATA from '../../constants/notificationData';

import './DefaultLayout.scss';
import { FiltrationPanel } from '../FiltrationPanel';

const CN = 'default-layout';

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    width: 80,
    height: 40,
    padding: '0',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '& > span': {
      color: 'white'
    }
  }
})(Button);

class DefaultLayout extends Component {
  static scrollToTop() {
    window && window.scrollTo({
      top: 500,
      left: 0,
      behavior: 'smooth',
      yearValue: '',
      withGenres: ''
    });
  }

  constructor(props) {
    super(props);

    autoBind(this);
  }

  shouldFiltrationsBeRendered() {
    const { location: { pathname }, routingConfig: { movie, tvShow, main } } = this.props;

    return (pathname.includes(movie.movieList) || pathname.includes(tvShow.showList) || pathname === main);
  }

  handleLoginClick() {
    const { history, loginService, enqueueSnackbar, routingConfig: { login } } = this.props;
    const { REGULAR_ERROR } = NOTIFICATION_DATA;

    loginService
      .getToken()
      .then((data) => {
        ls.set('requestToken', data.request_token);
        history.push(login);
      })
      .catch(() => enqueueSnackbar(REGULAR_ERROR.message, REGULAR_ERROR.params));
  }

  renderLoginButton() {
    const {
      isAuthenticated,
      location: { pathname },
      routingConfig: { login }
    } = this.props;

    return !isAuthenticated && !pathname.includes(login);
  }

  render() {
    const {
      component: Page,
      hideFooter,
      hideHeader,
      location,
      history,
      viewport: { device },
      isAuthenticated,
      ...rest
    } = this.props;
    const isDesktop = device === DESKTOP;
    const isMobile = device === MOBILE;
    const isLargeScreen = device === LARGE_SCREEN;

    return (
      <Route
        {...rest}
        render={(props) => (
          <div className={CN}>
            { <Header history={history} />}
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <div className={cx(`${CN}__page-wrapper`, (isDesktop || isLargeScreen) && `${CN}__desktop-page-wrapper`)}>
              <div className={cx(`${CN}__filtration-panel-wrapper`, (isDesktop || isLargeScreen) && `${CN}__filtration-panel-wrapper-desktop`)}>
                {this.shouldFiltrationsBeRendered() && <FiltrationPanel location={location} />}
              </div>
              {this.renderLoginButton() && (
                <div className={cx(`${CN}__login-container`, isMobile && `${CN}__login-container-mobile`)}>
                  <StyledButton onClick={this.handleLoginClick}>
                  Login
                  </StyledButton>
                </div>
              )}
              <Page scrollToTop={DefaultLayout.scrollToTop} {...props} />
            </div>
          </div>
        )}
      />
    );
  }
}

DefaultLayout.propTypes = {
  component: PropTypes.any,
  hideFooter: PropTypes.bool,
  hideHeader: PropTypes.bool
};

DefaultLayout.defaultProps = {
  component: null,
  hideFooter: false,
  hideHeader: false
};

export default withRouter(DefaultLayout);
