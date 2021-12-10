import { Record, List } from 'immutable';
import defaultImage from '../assets/images/noimage.png';
import { IMAGE_BASE_URL } from '../constants/configurations';

/**
 * MovieCardModel
 *
 * popularity: Number
 * vote_count: Number
 * video: Boolean
 * poster_path: String
 * id: Number
 * adult: Boolean
 * backdrop_path: String
 * original_language: String
 * original_title: String
 * genre_ids: List
 * title: String
 * vote_average: Number
 * overview: String
 * release_date: String
 * original_name: String,
 * name: String,
 * origin_country: List,
 * first_air_date: String
 */

export class MovieCardModel extends Record({
  popularity: 0,
  vote_count: 0,
  video: false,
  poster_path: null,
  id: 0,
  adult: false,
  backdrop_path: null,
  original_language: null,
  original_title: null,
  genre_ids: List(),
  title: null,
  vote_average: 0,
  overview: null,
  release_date: null,

  original_name: null,
  name: null,
  origin_country: [],
  first_air_date: null
}, 'MovieCardModel') {
  getId() {
    return this.get('id');
  }

  get title() {
    const movieTitle = this.get('title');
    const showTitle = this.get('name');

    return movieTitle === null ? showTitle : movieTitle;
  }

  get originalTitle() {
    const movieOriginalTitle = this.get('original_title');
    const showOriginalTitle = this.get('original_name');

    return movieOriginalTitle === null ? showOriginalTitle : movieOriginalTitle;
  }

  get releaseDate() {
    const movieRelease = this.get('release_date');
    const showRelease = this.get('first_air_date');

    const releaseDate = movieRelease === null ? showRelease : movieRelease;

    return new Date(releaseDate).getFullYear();
  }

  get poster() {
    const posterPath = this.get('poster_path');

    return (!posterPath) ? defaultImage : `${IMAGE_BASE_URL}${posterPath}`;
  }

  get movieVote() {
    return this.get('vote_average');
  }

  get movieVoteCount() {
    return this.get('vote_count');
  }

  get movieGeresId() {
    return this.get('genre_ids');
  }
}
