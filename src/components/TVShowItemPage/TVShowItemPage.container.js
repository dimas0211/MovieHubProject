import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import connectWithViewport from '../../services/connectWithViewport';

import TVShowItemPage from './TVShowItemPage';
import connectWithIoC from '../../services/connectWithIoC';
import {
  getGenresError,
  getGenresSuccess,
  getOneMovieSuccess,
  getOneMovieError,
  clearOneMovie,
  getVideosSuccess,
  getVideosError
} from '../../actions/actionsAPIcall';

const mapStateToProps = ({
  ApiReducer: {
    error,
    movie,
    genresList,
    videos,
    oneMovieId,
    movieOrShow
  }
}) => ({
  error,
  movie,
  genres: genresList.genres,
  videos,
  oneMovieId,
  movieOrShow
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getGenresSuccess,
  getGenresError,
  getOneMovieSuccess,
  getOneMovieError,
  clearOneMovie,
  getVideosSuccess,
  getVideosError
}, dispatch);

export const TVShowItemPageContainer = compose(
  connectWithIoC(['getDataService', 'apiCallConfig', 'routingConfig']),
  connectWithViewport(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TVShowItemPage);
