import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';
import ScrollToTop from './components/ScrollToTop';
import Routes from './components/Routes';
import configureStore from './store/index';
import Loader from './components/Loader';
import { NOTIFICATION_ANCHOR, NOTIFICATION_EMOJI } from './constants/configurations';

import './App.scss';

const { store, persistor } = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.notistackRef = React.createRef();
  }

  onClickDismiss = (key) => () => {
    this.notistackRef.current.closeSnackbar(key);
  }

  render() {
    const { history } = this.props;

    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <ConnectedRouter history={history}>
            <SnackbarProvider
              ref={this.notistackRef}
              action={(key) => (
                <Button onClick={this.onClickDismiss(key)}>
                  Dismiss
                </Button>
              )}
              anchorOrigin={NOTIFICATION_ANCHOR}
              iconVariant={NOTIFICATION_EMOJI}
              preventDuplicate
            >
              <ScrollToTop />
              <Routes />
            </SnackbarProvider>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
