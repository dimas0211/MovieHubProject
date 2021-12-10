import autoBind from 'auto-bind';
import ls from 'local-storage';

class GetDataService {
  static $inject = ['httpService', 'apiCallConfig'];

  static $singleton = true;

  constructor(httpService, apiCallConfig) {
    this.httpService = httpService;
    this.apiCallConfig = apiCallConfig;
    this.baseURL = this.apiCallConfig.baseURL;
    this.movie = this.apiCallConfig.movie;
    this.movieGenres = this.apiCallConfig.genres.movieGenres;

    autoBind(this);
  }

  getMovieList(page = 1, movieOrShow = this.movie, ...otherParams) {
    const { movieList: { targetPath } } = this.apiCallConfig;
    const parsedParams = otherParams.reduce((acc, el) => ({ ...acc, ...el }), {});

    return this.httpService.get(`${this.baseURL}${targetPath}${movieOrShow}`, {
      params: {
        page,
        ...parsedParams
      }
    });
  }

  getNewMoviesList() {
    const { newMovies, movieList: { targetPath } } = this.apiCallConfig;

    return this.httpService.get(`${this.baseURL}${targetPath}${this.movie}`, {
      params: {
        ...newMovies
      }
    });
  }

  getPopularMoviesList() {
    const { popularMovies, movieList: { targetPath } } = this.apiCallConfig;

    return this.httpService.get(`${this.baseURL}${targetPath}${this.movie}`, {
      params: {
        ...popularMovies
      }
    });
  }

  getGenres(movieOrShow = this.movieGenres) {
    const { genres: { targetPath } } = this.apiCallConfig;

    return this.httpService.get(`${this.baseURL}${targetPath}${movieOrShow}`);
  }

  getOneMovie(movieId, movieOrShow = this.movie) {
    return this.httpService.get(`${this.baseURL}${movieOrShow}/${movieId}`);
  }

  getVideos(movieId, movieOrShow = this.movie) {
    const { videos } = this.apiCallConfig;

    return this.httpService.get(`${this.baseURL}${movieOrShow}/${movieId}${videos}`);
  }

  searchMovies(page = 1, movieOrShow = this.movie, query) {
    const { search } = this.apiCallConfig;

    return this.httpService.get(`${this.baseURL}${search}${movieOrShow}`, {
      params: {
        page,
        query
      }
    });
  }

  setMovieRating(movieOrShow = this.movie, movieId, movieRating) {
    const { rating } = this.apiCallConfig;
    const sessionId = ls.get('sessionId');
    const ratingParams = {
      value: movieRating
    };
    const query = {
      session_id: `${sessionId}`
    };

    return this.httpService.post(`${this.baseURL}${movieOrShow}/${movieId}${rating}`, ratingParams, { params: query });
  }
}

export default GetDataService;
