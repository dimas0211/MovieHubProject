import React, { Component } from 'react';
import autoBind from 'auto-bind';
import {
  Tabs, Tab, InputBase, Button, withStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import UserMenu from '../UserMenu';
import Logo from '../../assets/images/icon-movie.png';

import './Navigation.scss';

const CN = 'navigation-bar';

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    width: 50,
    padding: '0',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '& > span': {
      color: 'white'
    }
  }
})(Button);

const StyledInput = withStyles({
  root: {
    color: 'white'
  }
})(InputBase);

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      query: '',
      location: props.location
    };

    autoBind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { pathname } = prevState.location;

    if (pathname !== nextProps.location.pathname) {
      return {
        query: '',
        location: nextProps.location
      };
    }

    return null;
  }

  handleSearchInput(event) {
    this.setState({ query: event.target.value });
  }

  handleChange(event, tabIndex) {
    this.setState({ selectedTab: tabIndex });
  }

  handleSearchSubmit() {
    const { query } = this.state;
    const { handleSearch } = this.props;

    handleSearch && handleSearch(query);
  }

  isButtonDisabled() {
    const { query } = this.state;

    return !query;
  }

  renderUserIcon() {
    const { setUserUnauthenticated, userName, loginService, enqueueSnackbar } = this.props;

    return (
      <UserMenu
        CN={CN}
        setUserUnauthenticated={setUserUnauthenticated}
        userName={userName}
        loginService={loginService}
        enqueueSnackbar={enqueueSnackbar}
      />
    );
  }

  render() {
    const { selectedTab, query } = this.state;
    const { options, isAuthenticated } = this.props;

    return (
      <div className={CN}>
        <div className={`${CN}__nav-wrapper`}>
          <div className={`${CN}__logo-user-container`}>
            <Link className={`${CN}__logo-container`} to="/">
              <img alt="logo" className={`${CN}__logo-img`} src={Logo} />
              <h3 className={`${CN}__logo-name`}>Movie Hub</h3>
            </Link>
            {isAuthenticated && this.renderUserIcon()}
          </div>
          <Tabs
            centered
            className={`${CN}__tabs-container`}
            indicatorColor="secondary"
            textColor="secondary"
            value={selectedTab}
            onChange={this.handleChange}
          >
            {options.map((menuItem) => (
              <Tab
                className={`${CN}__tab`}
                component={Link}
                key={menuItem.value}
                label={menuItem.label}
                to={menuItem.link}
              />
            ))}
          </Tabs>
          <div className={`${CN}__search-container`}>
            <SearchIcon className={`${CN}__search-icon`} />
            <StyledInput
              className={`${CN}__search-field`}
              placeholder="Search…"
              value={query}
              onChange={this.handleSearchInput}
            />
            <StyledButton disabled={this.isButtonDisabled()} onClick={this.handleSearchSubmit}>
              Find
            </StyledButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
