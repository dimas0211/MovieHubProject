import { routingConfig } from './config/routingConfig';

const {
  movie: { movieList },
  tvShow: { showList }
} = routingConfig;

export default {
  navConfig: [
    { value: 'movies', label: 'MOVIES', link: movieList },
    { value: 'tv-shows', label: 'SHOWS', link: showList }
  ],
  burgerMenuItemsList: [
    { value: 'movies', label: 'MOVIES', link: movieList },
    { value: 'tv-shows', label: 'SHOWS', link: showList }
  ]
};
