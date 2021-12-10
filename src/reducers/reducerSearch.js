import { SET_SEARCH_MODE, CLEAR_SEARCH_MODE, SET_SEARCH_QUERY, CLEAR_SEARCH_QUERY } from '../constants/actionTypes/index';

const initialState = {
  searchMode: false,
  searchQuery: []
};

export const setSearchModeReducer = (state = initialState, { type, query }) => {
  switch (type) {
    case SET_SEARCH_MODE:
      return {
        ...state,
        searchMode: true
      };
    case CLEAR_SEARCH_MODE:
      return {
        ...state,
        searchMode: false
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: query
      };
    case CLEAR_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: []
      };
    default:
      return state;
  }
};
