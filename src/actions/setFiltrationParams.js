import { SET_FILTRATION_PARAMS, CLEAR_FILTRATION_PARAMS } from '../constants/actionTypes';

export const setFiltrationParams = (year, genre) => ({ type: SET_FILTRATION_PARAMS, year, genre });

export const clearFiltrationParams = () => ({ type: CLEAR_FILTRATION_PARAMS });
