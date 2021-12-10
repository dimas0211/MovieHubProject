import React, { Component } from 'react';
import autoBind from 'auto-bind';
import ls from 'local-storage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles, MenuItem, Menu, Button } from '@material-ui/core';
import * as NOTIFICATION_DATA from '../../constants/notificationData';

import './UserMenu.scss';

const UCN = 'user-menu';

const StyledMenu = withStyles({
  paper: {
    color: 'white',
    backgroundColor: '#353b48',
    fontFamily: '"Nunito-Regular"',
    '& > ul > .user-greeting': {
      textAlign: 'center',
      margin: '10px auto',
      width: 200,
      color: '#00966c'
    }
  },
  list: {
    '& > li': {
      fontFamily: '"Nunito-Regular"',
      display: 'flex',
      justifyContent: 'center'
    }
  }
})(Menu);

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };

    autoBind(this);
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOut() {
    const { setUserUnauthenticated, loginService, enqueueSnackbar } = this.props;
    const { LOGGED_OUT, REGULAR_ERROR } = NOTIFICATION_DATA;

    this.handleClose();

    loginService
      .deleteSession()
      .then((data) => {
        if (data.success) {
          ls.remove('sessionId');
        } else {
          enqueueSnackbar(REGULAR_ERROR.message, REGULAR_ERROR.params);
        }
      })
      .catch((error) => console.log(error));
    // .catch((error) => enqueueSnackbar(error.message, { variant: ERROR_TYPES.error }));

    setUserUnauthenticated && setUserUnauthenticated();
    enqueueSnackbar(LOGGED_OUT.message, LOGGED_OUT.params);
  }

  render() {
    const { anchorEl } = this.state;
    const { CN, userName } = this.props;

    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
          <AccountCircleIcon className={`${CN}__user-logo`} />
        </Button>
        <StyledMenu
          anchorEl={anchorEl}
          id="simple-menu"
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <h4 className="user-greeting">{`Hello ${userName}`}</h4>
          <hr className={`${UCN}__underline`} />
          <MenuItem onClick={this.handleLogOut}>
            Logout
            <ExitToAppIcon className={`${UCN}__logout-logo`} />
          </MenuItem>
        </StyledMenu>
      </div>
    );
  }
}

export default UserMenu;

