import { SET_USER_AUTHENTICATED, SET_USER_UNAUTHENTICATED } from '../constants/actionTypes';

export const setUserAuthenticated = (userName, time) => ({ type: SET_USER_AUTHENTICATED, userName, time });

export const setUserUnauthenticated = () => ({ type: SET_USER_UNAUTHENTICATED });
