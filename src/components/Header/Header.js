import React, { Component } from 'react';
import autoBind from 'auto-bind';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { NavigationMob } from '../Navigation/NavigationMobile';
import config from '../../config';
import { DESKTOP, LARGE_SCREEN } from '../../constants/configurations';

const { navConfig } = config;

class Header extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  handleSearch(query) {
    const { setSearchMode, setSearchQuery, history, routingConfig: { search } } = this.props;

    setSearchMode && setSearchMode();
    setSearchQuery && setSearchQuery(query);

    history.push(`${search.searchPath.replace(':query', query)}`);
  }

  render() {
    const { location, viewport: { device } } = this.props;
    const isDesktop = device === DESKTOP;
    const isLargeScreen = device === LARGE_SCREEN;

    return (
      <div>
        {isDesktop || isLargeScreen
          ? <Navigation options={navConfig} location={location} handleSearch={this.handleSearch} />
          : <NavigationMob options={navConfig} location={location} handleSearch={this.handleSearch} viewport={device} />}
      </div>
    );
  }
}

export default withRouter(Header);
