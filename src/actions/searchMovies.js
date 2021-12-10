import {
  SET_SEARCH_MODE,
  CLEAR_SEARCH_MODE,
  SET_SEARCH_QUERY,
  CLEAR_SEARCH_QUERY
} from '../constants/actionTypes';

export const setSearchMode = () => ({ type: SET_SEARCH_MODE });

export const clearSearchMode = () => ({ type: CLEAR_SEARCH_MODE });

export const setSearchQuery = (query) => ({ type: SET_SEARCH_QUERY, query });

export const clearSearchQuery = () => ({ type: CLEAR_SEARCH_QUERY });
