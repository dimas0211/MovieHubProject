import { SET_FILTRATION_PARAMS, CLEAR_FILTRATION_PARAMS } from '../constants/actionTypes/index';

const initialState = {
  filtrationQueryParams: []
};

export const setFiltrationParamsReducer = (state = initialState, { type, year, genre }) => {
  switch (type) {
    case SET_FILTRATION_PARAMS:
      return {
        ...state,
        filtrationQueryParams: [year, genre]
      };
    case CLEAR_FILTRATION_PARAMS:
      return {
        ...state,
        filtrationQueryParams: []
      };
    default:
      return state;
  }
};
