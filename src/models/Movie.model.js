// eslint-disable-next-line max-classes-per-file
import { Record, List, Map } from 'immutable';
import { IMAGE_BASE_URL } from '../constants/configurations';
import defaultImage from '../assets/images/noimage.png';

/**
 * GenreItemModel
 * id: Number
 * name" String
 */

class GenreItemModel extends Record({
  id: 0,
  name: null
}) {}

class ProdCompanyModel extends Record({
  id: 0,
  logo_path: null,
  name: null,
  origin_country: null
}) {}

class ProdCountryModel extends Record({
  iso_3166_1: null,
  name: null
}) {}

class SpokenLanguageModel extends Record({
  iso_639_1: null,
  name: null
}) {}

class SeasonsModel extends Record({
  air_date: null,
  episode_count: 0,
  id: 0,
  name: null,
  overview: null,
  poster_path: null,
  season_number: 0
}) {
  get poster() {
    const posterPath = this.get('poster_path');

    return (!posterPath) ? defaultImage : `${IMAGE_BASE_URL}${posterPath}`;
  }
}

/**
 * adult: Boolean,
 * backdrop_path: String,
 * belongs_to_collection: Map(),
 * budget: Number,
 * genres: List(),
 * homepage: String,
 * id: Number,
 * imdb_id: String,
 * original_language: String,
 * original_title: String,
 * overview: String,
 * popularity: Number,
 * poster_path: String,
 * production_companies: List(),
 * production_countries: List(),
 * release_date: String,
 * revenue: Number,
 * runtime: Number,
 * spoken_languages: List(),
 * status: String,
 * tagline: String,
 * video: Boolean,
 * vote_average: Number,
 * vote_count: Number
 */

export class MovieModel extends Record({
  adult: false,
  backdrop_path: null,
  belongs_to_collection: Map(),
  budget: null,
  genres: List(),
  homepage: null,
  id: 0,
  imdb_id: null,
  original_language: null,
  original_title: null,
  overview: null,
  popularity: 0,
  poster_path: null,
  production_companies: List(),
  production_countries: List(),
  release_date: null,
  revenue: 0,
  runtime: 0,
  spoken_languages: List(),
  status: null,
  tagline: null,
  title: null,
  video: false,
  vote_average: 0,
  vote_count: 0,
  created_by: List(),
  episode_run_time: List(),
  first_air_date: null,
  in_production: false,
  languages: List().asImmutable(),
  last_air_date: null,
  last_episode_to_air: List(),
  name: null,
  next_episode_to_air: null,
  networks: List(),
  number_of_episodes: 0,
  number_of_seasons: 0,
  origin_country: List(),
  original_name: null,
  seasons: List(),
  type: null
}, 'MovieModel') {
  constructor(values) {
    super(values);

    return this
      .set('results', this.populateGenres())
      .set('production_companies', this.populateProdCompanies())
      .set('production_countries', this.populateProdCountries())
      .set('spoken_languages', this.populateLanguages())
      .set('seasons', this.populateSeasons());
  }

  populateGenres() {
    const genres = this.get('genres');

    if (genres.length) {
      return List(genres.map((genre) => new GenreItemModel(genre)));
    }

    return List();
  }

  populateProdCompanies() {
    const productionCompanies = this.get('production_companies');

    if (productionCompanies.length) {
      return List(productionCompanies.map((company) => new ProdCompanyModel(company)));
    }

    return List();
  }

  populateProdCountries() {
    const productionCountries = this.get('production_countries');

    if (productionCountries.length) {
      return List(productionCountries.map((country) => new ProdCountryModel(country)));
    }

    return List();
  }

  populateLanguages() {
    const languages = this.get('spoken_languages');

    if (languages.length) {
      return List(languages.map((language) => new SpokenLanguageModel(language)));
    }

    return List();
  }

  populateSeasons() {
    const seasons = this.get('seasons');

    if (seasons.length) {
      return List(seasons.map((season) => new SeasonsModel(season)));
    }

    return List();
  }

  get id() {
    return this.get('id');
  }

  get backdropPath() {
    return this.get('backdrop_path');
  }

  get budget() {
    return this.get('budget');
  }

  get genres() {
    const genresList = this.get('genres');

    return List(genresList.map((el) => el));
  }

  get homePage() {
    return this.get('homepage');
  }

  get originLanguage() {
    return this.get('original_language');
  }

  get originTitle() {
    const movieTitle = this.get('original_title');
    const showTitle = this.get('original_name');

    return movieTitle === null ? showTitle : movieTitle;
  }

  get overview() {
    return this.get('overview');
  }

  get popularity() {
    return this.get('popularity');
  }

  get poster() {
    const posterPath = this.get('poster_path');

    return (!posterPath) ? defaultImage : `${IMAGE_BASE_URL}${posterPath}`;
  }

  get prodCompanies() {
    const companyList = this.get('production_companies');

    return List(companyList.map((el) => `${el.name} `));
  }

  get prodCountries() {
    const counriesListMovie = this.get('production_countries');
    const counriesListShow = this.get('origin_country');

    if (counriesListShow.length > 0) {
      return List(counriesListShow.map((el) => `${el} `));
    }

    return List(counriesListMovie.map((el) => `${el.iso_3166_1} `));
  }

  get releaseDate() {
    const movieDate = this.get('release_date');
    const tvShowDate = this.get('first_air_date');

    const releaseDate = movieDate === null ? tvShowDate : movieDate;

    return new Date(releaseDate).toLocaleDateString();
  }

  get movieYear() {
    const movieDate = this.get('release_date');
    const tvShowDate = this.get('first_air_date');

    const releaseDate = movieDate === null ? tvShowDate : movieDate;

    return new Date(releaseDate).getFullYear();
  }

  get revenue() {
    return this.get('revenue');
  }

  get duration() {
    const episodeRunTime = this.get('episode_run_time').map((time) => `${time} `);
    const movieRunTime = this.get('runtime');

    return !!movieRunTime ? movieRunTime : episodeRunTime;
  }

  get languages() {
    const movieLanguages = this.get('spoken_languages');
    const showLanguages = this.get('languages');

    if (showLanguages.length > 0) {
      return List(showLanguages.map((el) => `${el.toUpperCase()} `));
    }

    return List(movieLanguages.map((el) => `${el.name} `));
  }

  get status() {
    return this.get('status');
  }

  get tag() {
    return this.get('tagline');
  }

  get title() {
    const movieTitle = this.get('title');
    const showTitle = this.get('name');

    return movieTitle === null ? showTitle : movieTitle;
  }

  get movieVote() {
    return this.get('vote_average');
  }

  get voteCount() {
    return this.get('vote_count');
  }
}
