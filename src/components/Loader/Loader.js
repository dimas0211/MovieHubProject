import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledLoader = withStyles({
  root: {
    width: 100
  }
})(CircularProgress);

const Loader = ({ className }) => (
  <div className={className}>
    <StyledLoader color="secondary" />
  </div>
);

export default Loader;
