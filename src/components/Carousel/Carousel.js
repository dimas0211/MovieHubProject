import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { CAROUSEL_SIZE_VALUES } from '../../constants/configurations';
import { scrollTo } from './ScrollToHelper';

import './Carousel.scss';

const CN = 'carousel';
const LEFT = 'left';
const RIGHT = 'right';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.carouselViewport = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.resizeTheCarousel = this.resizeTheCarousel.bind(this);
    this.countTheSlideWidth = this.countTheSlideWidth.bind(this);
    this.state = {
      numOfSlidesToScroll: 2,
      allTheWayLeft: false,
      allTheWayRight: false,
      slidesCount: this.getSlidesCount()
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.resizeTheCarousel();
    this.checkNumOfSlidesToScroll();
    this.checkIfSlidesAllTheWayOver();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onScroll() {
    this.checkIfSlidesAllTheWayOver();
  }

  onResize() {
    this.resizeTheCarousel();
    this.checkNumOfSlidesToScroll();
    this.getSlidesCount();
  }

  getSlidesCount = () => {
    const { large, desktop, tablet, mobile } = CAROUSEL_SIZE_VALUES;
    let count;

    if (window.innerWidth >= large.width) {
      count = large.slidesCount;
    } else if (window.innerWidth >= desktop.width) {
      count = desktop.slidesCount;
    } else if (window.innerWidth >= tablet.width) {
      count = tablet.slidesCount;
    } else if (window.innerWidth >= mobile.width) {
      count = mobile.slidesCount;
    }

    return count;
  };

  resizeTheCarousel() {
    this.setState({ slidesCount: this.getSlidesCount() });
    this.countTheSlideWidth();
  }

  countTheSlideWidth() {
    const { scrollWidth } = this.carouselViewport.current.parentElement;
    const { slidesCount } = this.state;

    this.setState({ widthOfSlide: scrollWidth / slidesCount });
  }

  checkIfSlidesAllTheWayOver() {
    const {
      scrollLeft,
      clientWidth,
      scrollWidth
    } = this.carouselViewport.current;
    // if scrollLeft == 0
    // hide left button
    const allTHeWayLeftValue = scrollLeft === 0;

    // if scrollLeft + viewPortOffset.length === whole viewPort length
    // 9 cards - each 120px: 9 * 210all === whole viewPort length
    // hide the rightScrollButton
    const allTheWayRightValue = scrollLeft + clientWidth === scrollWidth;
    const { allTheWayLeft, allTheWayRight } = this.state;

    if (allTheWayLeft !== allTHeWayLeftValue) {
      this.setState({
        allTheWayLeft: allTHeWayLeftValue
      });
    }

    if (allTheWayRight !== allTheWayRightValue) {
      this.setState({
        allTheWayRight: allTheWayRightValue
      });
    }
  }

  checkNumOfSlidesToScroll() {
    const { desktop } = CAROUSEL_SIZE_VALUES;
    const numOfSlidesToScroll = window.innerWidth <= desktop.width ? 1 : 2;
    const { numOfSlidesToScroll: numOfSlides } = this.state;

    numOfSlides !== numOfSlidesToScroll
    && this.setState({ numOfSlidesToScroll });
  }

  handleClick({ currentTarget }) {
    const clickedBtn = currentTarget.classList.contains(`${CN}__left-nav`)
      ? LEFT
      : RIGHT;
    const { numOfSlidesToScroll, widthOfSlide } = this.state;
    const carouselViewport = this.carouselViewport.current;
    const step = numOfSlidesToScroll * widthOfSlide;
    const newPos = clickedBtn === LEFT
      ? carouselViewport.scrollLeft - step
      : carouselViewport.scrollLeft + step;
    const timeToMoveOneSlide = 200;
    const totalTimeToMove = numOfSlidesToScroll * timeToMoveOneSlide;

    scrollTo({
      element: this.carouselViewport,
      to: newPos,
      duration: totalTimeToMove,
      scrollDirection: 'scrollLeft'
    });
  }

  renderChildren() {
    const { children } = this.props;
    const { widthOfSlide } = this.state;
    const style = { maxWidth: widthOfSlide };

    return children.map((item) => (
      <div
        key={item.key}
        className={`${CN}__child`}
        style={style}
      >
        {item}
      </div>
    ));
  }

  render() {
    const { allTheWayLeft, allTheWayRight } = this.state;
    const leftNavClasses = cx(
      `${CN}__nav`,
      `${CN}__left-nav`,
      allTheWayLeft && [`${CN}__nav-disabled`]
    );
    const rightNavClasses = cx(
      `${CN}__right-nav`,
      `${CN}__nav`,
      allTheWayRight && [`${CN}__nav-disabled`]
    );

    return (
      <div className={`${CN} content`}>
        <div
          className={`${CN}__viewport`}
          ref={this.carouselViewport}
          onScroll={this.onScroll}
        >
          {this.renderChildren()}
        </div>
        <button
          className={leftNavClasses}
          type="button"
          onClick={this.handleClick}
        >
          <ArrowBackIosIcon className={`${CN}__arrow-button`} />
        </button>
        <button
          type="button"
          className={rightNavClasses}
          onClick={this.handleClick}
        >
          <ArrowForwardIosIcon className={`${CN}__arrow-button`} />
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.array.isRequired
};

export default Carousel;
