export const apiCallConfig = {
  baseURL: 'https://api.themoviedb.org/3',
  loginUrl: 'https://www.themoviedb.org/authenticate',
  imageBaseURL: 'https://image.tmdb.org/t/p/w500/',
  apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjRkZjI2OGRkZDk2ZmZiNDM0NGExYjIwZDkzZDI0YiIsInN1YiI6IjVlMzg2ZmY3NGNhNjc2MDAxNDUzYmU4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XfOoEYbhA813Z2z8dbshOuUetMBy9V1aey67QyGP1fo',
  movie: '/movie',
  tvShow: '/tv',
  movieList: {
    targetPath: '/discover'
  },
  genres: {
    targetPath: '/genre',
    movieGenres: '/movie/list',
    tvShowGenres: '/tv/list'
  },
  videos: '/videos',
  search: '/search',
  newMovies: {
    primary_release_year: 2020
  },
  popularMovies: {
    'vote_average.gte': 8
  },
  newTokenPath: '/authentication/token/new',
  newTokenWithLogin: '/authentication/token/validate_with_login',
  session: '/authentication/session',
  newSession: '/authentication/session/new',
  rating: '/rating'
};
