import { Record, List } from 'immutable';
import { MovieCardModel } from './MovieCard.model';

/**
 * MovieListModel
 *
 * page: Number
 * totalResults: Number
 * totalPages: Number
 * results: List
 */

export class MovieListModel extends Record({
  page: 1,
  total_results: 0,
  total_pages: 0,
  results: List()
}, 'MovieListModel') {
  constructor(values) {
    super(values);

    return this
      .set('results', this.populateResults());
  }

  populateResults() {
    const movies = this.get('results');

    if (movies.length) {
      return List(movies.map((movie) => new MovieCardModel(movie)));
    }

    return List();
  }

  getPage() {
    return this.get('page');
  }

  getNumberOfPages() {
    return this.get('total_pages');
  }

  getMovieList() {
    return this.get('results');
  }
}
