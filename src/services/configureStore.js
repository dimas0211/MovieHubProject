import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';
import {
  MovieListModel,
  GenresModel,
  MovieModel,
  VideosModel,
  MovieCardModel
} from '../models';

export const history = createBrowserHistory();

const persistConfig = {
  // If your reducer's state contains Immutable Records
  // before adding it to redux-persist whitelist
  // you need to configure persist transformation
  // https://github.com/rt2zz/redux-persist-transform-immutable
  transforms: [immutableTransform({ records: [MovieListModel, GenresModel, MovieModel, VideosModel, MovieCardModel] })],
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

export default () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  );
  const persistor = persistStore(store);

  return { store, persistor };
};
