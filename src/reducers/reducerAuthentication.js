import { SET_USER_AUTHENTICATED, SET_USER_UNAUTHENTICATED } from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  userName: 'Guest',
  authTime: null
};

export const authenticationReducer = (state = initialState, { type, userName, time }) => {
  switch (type) {
    case SET_USER_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: true,
        userName: userName || 'Guest',
        authTime: time
      };
    }
    case SET_USER_UNAUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: false,
        userName: null,
        authTime: null
      };
    }
    default:
      return state;
  }
};
