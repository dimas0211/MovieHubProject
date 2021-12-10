import React, { Component } from 'react';
import CarouselItem from '../CarouselItem';
import Carousel from '../Carousel';

import './TwoCarouselsComponent.scss';

const CN = 'carousels-component';

class TwoCarouselsComponent extends Component {
  componentDidMount() {
    this.loadCarouselMovieLists();
  }

  loadCarouselMovieLists() {
    const {
      getDataService,
      getNewMoviesSuccess,
      getNewMoviesError,
      getPopularMoviesSuccess,
      getPopularMoviesError
    } = this.props;

    getDataService
      .getNewMoviesList()
      .then((data) => getNewMoviesSuccess(data))
      .catch((error) => getNewMoviesError(error));

    getDataService
      .getPopularMoviesList()
      .then((data) => getPopularMoviesSuccess(data))
      .catch((error) => getPopularMoviesError(error));
  }

  renderNewMoviesItems() {
    const { newMovies, routingConfig, viewport: { device } } = this.props;

    return [...newMovies.getMovieList().map((movieData) => (
      <CarouselItem
        className={`${CN}__carousel-item-card`}
        device={device}
        id={movieData.getId()}
        key={movieData.getId()}
        movieData={movieData}
        routingConfig={routingConfig}
      />
    ))];
  }

  renderPopularMoviesItems() {
    const { popularMovies, routingConfig, viewport: { device } } = this.props;

    return [...popularMovies.getMovieList().map((movieData) => (
      <CarouselItem
        className={`${CN}__carousel-item-card`}
        device={device}
        id={movieData.getId()}
        key={movieData.getId()}
        movieData={movieData}
        routingConfig={routingConfig}
      />
    ))];
  }

  renderMovieCarousel() {
    const { newMovies, popularMovies, viewport: { value: viewportWidth, device } } = this.props;

    return (
      <div className={`${CN}__main-wrapper`}>
        {!newMovies.size && (
          <div className={`${CN}__item-wrapper`}>
            <h3 className={`${CN}__item-title`}>New Movies</h3>
            <Carousel
              className={`${CN}__carousel`}
              device={device}
              viewportWidth={viewportWidth}
            >
              {this.renderNewMoviesItems()}
            </Carousel>
          </div>
        )}
        {!popularMovies.size && (
          <div className={`${CN}__item-wrapper`}>
            <h3 className={`${CN}__item-title`}>Popular Movies</h3>
            <Carousel
              className={`${CN}__carousel`}
              device={device}
              viewportWidth={viewportWidth}
            >
              {this.renderPopularMoviesItems()}
            </Carousel>
          </div>
        )}
      </div>
    );
  }

  render() {
    return this.renderMovieCarousel();
  }
}

export default TwoCarouselsComponent;
