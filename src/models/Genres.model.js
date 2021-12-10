// eslint-disable-next-line max-classes-per-file
import { Record, List } from 'immutable';

/**
 * GenreItemModel
 * id: Number
 * name" String
 */

class GenreItemModel extends Record({
  id: 0,
  name: null
}) {}
/**
 * MovieListModel
 * genres: List
 */

export class GenresModel extends Record({
  genres: List()
}, 'GenresModel') {
  constructor(values) {
    super(values);

    return this
      .set('genres', this.populateGenres());
  }

  populateGenres() {
    const genres = this.get('genres');

    if (genres.length) {
      return List(genres.map((genre) => new GenreItemModel(genre)));
    }

    return List();
  }
}
