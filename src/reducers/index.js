import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { ApiReducer } from './reducerAPIcall';
import { setFiltrationParamsReducer } from './reducerSetFiltrationParams';
import { setSearchModeReducer } from './reducerSearch';
import { authenticationReducer } from './reducerAuthentication';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ApiReducer,
  setFiltrationParamsReducer,
  setSearchModeReducer,
  authenticationReducer
});

export default createRootReducer;
