/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import autoBind from 'auto-bind';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VideoPlayer from '../VideoPlayer';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      aria-labelledby={`wrapped-tab-${index}`}
      component="div"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`
  };
}

const StyledAppBar = withStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#282D2D'
  }
})(AppBar);

const StyledTabPanel = withStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#282D2D'
  }
})(TabPanel);

class VideoPlayerBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };

    autoBind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  returnTabs() {
    const { videos } = this.props;

    return videos.getVideos().map((video, index) => (
      <Tab
        key={video.id}
        label={video.name}
        value={index}
        wrapped
        {...a11yProps(index)}
      />
    ));
  }

  returnTabPanel(value) {
    const { videos, CN, isMobile } = this.props;

    return videos.getVideos().map((video, index) => (
      <StyledTabPanel index={index} key={video.id} value={value}>
        <p className={`${CN}__info-item-container`}>
          <span className={`${CN}__info-item-name`}>Language: </span>
          <span className={`${CN}__info-item-value video-title`}>
            {video.language}
          </span>
        </p>
        <VideoPlayer isMobile={isMobile} title={video.type} youtubeId={video.key} />
      </StyledTabPanel>
    ));
  }

  render() {
    const { value, CN } = this.state;

    return (
      <div className={`${CN}__wrapper`}>
        <StyledAppBar position="static">
          <Tabs aria-label="wrapped label tabs example" value={value} variant="scrollable" onChange={this.handleChange}>
            {this.returnTabs()}
          </Tabs>
        </StyledAppBar>
        {this.returnTabPanel(value)}
      </div>
    );
  }
}

export default VideoPlayerBar;

