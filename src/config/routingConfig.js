export const routingConfig = {
  main: '/',
  view: '/view/:id',
  movie: {
    movieList: '/movie-list',
    moviePath: '/movie'
  },
  tvShow: {
    showList: '/tv-show-list',
    showPath: '/tv'
  },
  new: {
    newPath: '/new'
  },
  popular: {
    popularPath: '/popular'
  },
  search: {
    searchPath: '/search/:query'
  },
  login: '/login',
  notFound: 'not-found'
};

