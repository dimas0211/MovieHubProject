/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';

import { BREAKPOINTS } from '../constants/configurations';

const connectWithViewport = () => (WrappedComponent) => (
  class extends Component {
    constructor() {
      super();

      this.state = {
        viewport: BREAKPOINTS.LARGE_SCREEN
      };

      this.viewportUpdate = this.viewportUpdate.bind(this);
    }

    componentDidMount() {
      this.viewportUpdate();
      window.addEventListener('resize', this.viewportUpdate);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.viewportUpdate);
    }

    detectDesktopRequest() {
      const ua = window.navigator.userAgent;
      const iOSAgent = ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/);
      const iOSPlatform = window.navigator.platform && window.navigator.platform.match(/iPhone|iPod|iPad|iPhone Simulator/);
      const isDesktopRequested = !iOSAgent && !!iOSPlatform;

      return isDesktopRequested;
    }

    viewportUpdate() {
      const windowWidth = window.innerWidth;
      const { MOBILE, TABLET, DESKTOP, LARGE_SCREEN } = BREAKPOINTS;

      let viewport = MOBILE;

      if (windowWidth > DESKTOP.value) {
        viewport = DESKTOP;
      } else if (windowWidth > TABLET.value) {
        viewport = TABLET;
      } else if (windowWidth > DESKTOP.value) {
        viewport = DESKTOP;
      }

      if (windowWidth > LARGE_SCREEN.value) {
        viewport = LARGE_SCREEN;
      }

      this.setState({ viewport });
    }

    render() {
      const { viewport } = this.state;

      return (
        <WrappedComponent
          viewport={viewport}
          {...this.props}
        />
      );
    }
  }
);

export default connectWithViewport;
