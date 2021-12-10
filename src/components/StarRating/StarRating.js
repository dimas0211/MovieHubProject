/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import autoBind from 'auto-bind';
import * as NOTIFICATION_DATA from '../../constants/notificationData';

class StarRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: props.movie.movieVote / 2,
      movie: props.movie
    };
    autoBind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { movieVote } = prevState.movie;

    if (movieVote !== nextProps.movie.movieVote) {
      return {
        rating: nextProps.movie.movieVote / 2,
        movie: nextProps.movie
      };
    }

    return null;
  }

  changeRating(newRating) {
    const { getDataService, movieOrShow, id, enqueueSnackbar } = this.props;
    const { RATING_SUCCESS, ERROR_TYPES } = NOTIFICATION_DATA;
    const multipliedRating = newRating * 2;

    this.setState({
      rating: newRating
    });

    getDataService
      .setMovieRating(movieOrShow, id, multipliedRating)
      .then(enqueueSnackbar(RATING_SUCCESS.message, RATING_SUCCESS.params))
      .catch((error) => enqueueSnackbar(error.message, { variant: ERROR_TYPES.error }));
  }

  render() {
    const { rating } = this.state;
    const {
      CN, starsNumber, starWidth, starSpacing, isAuthenticated
    } = this.props;
    const restProps = {};
    const { changeRating } = this;

    if (isAuthenticated) {
      restProps.changeRating = changeRating;
      restProps.starHoverColor = '#00966c';
    }

    return (
      <StarRatings
        className={`${CN}__rating-starts`}
        name="rating"
        numberOfStars={starsNumber}
        rating={rating}
        starDimension={starWidth}
        starRatedColor="gold"
        starSpacing={starSpacing}
        {...restProps}
      />
    );
  }
}

export default StarRating;
