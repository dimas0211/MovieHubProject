export const ERROR_TYPES = {
  success: 'success',
  error: 'error',
  warning: 'warning'
};

// Regular Error

export const REGULAR_ERROR = {
  message: 'Something went wrong. Please, try again.',
  params: {
    variant: ERROR_TYPES.error
  }
};

export const DATA_NOT_LOADED = {
  message: 'sorry, couldn`t load data',
  params: {
    variant: ERROR_TYPES.error
  }
};

// LOGIN PARAMS
export const LOGIN_SUCCESS = {
  message: 'You have successfully logged in!',
  params: {
    variant: ERROR_TYPES.success
  }
};
export const LOGIN_ERROR = {
  message: 'Something went wrong with login. Please, try again.',
  params: {
    variant: ERROR_TYPES.error
  }
};
export const LOGIN_INCORRECT_CREDENTIALS = {
  message: 'Wrong login or password. Please, try again',
  params: {
    variant: ERROR_TYPES.error
  }
};
export const NOT_AUTHORIZED = {
  message: 'Sorry, you are not logged in',
  params: {
    variant: ERROR_TYPES.error
  }
};
export const LOGGED_OUT = {
  message: 'Logged out.',
  params: {
    variant: ERROR_TYPES.warning
  }
};

// RATING
export const RATING_SUCCESS = {
  message: 'You have successfully rated movie!',
  params: {
    variant: ERROR_TYPES.success
  }
};
