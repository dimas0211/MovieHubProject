export const MOBILE = 'mobile';
export const DESKTOP = 'desktop';
export const TABLET = 'tablet';
export const LARGE_SCREEN = 'largeScreen';

export const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjRkZjI2OGRkZDk2ZmZiNDM0NGExYjIwZDkzZDI0YiIsInN1YiI6IjVlMzg2ZmY3NGNhNjc2MDAxNDUzYmU4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XfOoEYbhA813Z2z8dbshOuUetMBy9V1aey67QyGP1fo';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

export const CAROUSEL_SIZE_VALUES = {
  large: { width: 1200, slidesCount: 6 },
  desktop: { width: 768, slidesCount: 4 },
  tablet: { width: 320, slidesCount: 3 },
  mobile: { width: 0, slidesCount: 2 }
};

export const BREAKPOINTS = {
  MOBILE: { value: 0, device: MOBILE },
  TABLET: { value: 576, device: TABLET },
  DESKTOP: { value: 768, device: DESKTOP },
  LARGE_SCREEN: { value: 1200, device: LARGE_SCREEN }
};

export const NOTIFICATION_ANCHOR = {
  vertical: 'bottom',
  horizontal: 'right'
};

export const NOTIFICATION_EMOJI = {
  success: '✅',
  error: '✖️',
  warning: '⚠️',
  info: 'ℹ️'
};
