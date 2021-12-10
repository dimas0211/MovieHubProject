import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import connectWithViewport from '../../services/connectWithViewport';

import FiltrationPanel from './FiltrationPanel';
import { setFiltrationParams, clearFiltrationParams } from '../../actions/setFiltrationParams';

const mapStateToProps = ({
  ApiReducer: {
    error,
    movie,
    genresList,
    videos
  },
  setFiltrationParamsReducer
}) => ({
  error,
  movie,
  genres: genresList.genres,
  videos,
  filtrationQueryParams: setFiltrationParamsReducer.filtrationQueryParams
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setFiltrationParams,
  clearFiltrationParams
}, dispatch);

export const FiltrationPanelContainer = compose(
  connectWithViewport(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FiltrationPanel);
