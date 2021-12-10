import React, { Component } from 'react';
import autoBind from 'auto-bind';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { NativeSelect, FormControl, Button } from '@material-ui/core';
import { MOBILE } from '../../constants/configurations';

import './FiltrationPanel.scss';

const CN = 'filtration-panel';

const style = {
  color: 'white',
  height: 30,
  width: 120,
  border: '1px solid #404040',
  borderRadius: '5px',
  margin: '5px',
  backgroundColor: '#282D2D',
  padding: '0',
  '& > *': {
    color: 'white',
    paddingRight: 0,
    fontFamily: '"Nunito-Regular"'
  },
  '& > div': {
    margin: 0,
    transform: 0
  },
  '& .MuiInputLabel-formControl': {
    margin: 0,
    transform: 'none'
  },
  '& .MuiFormLabel-filled': {
    color: '#282D2D',
    backgroundColor: '#282D2D'
  },
  '& > ::after, ::before': {
    borderBottom: '0px',
    padding: 0
  }
};

const StyledSelect = withStyles({
  root: {
    paddingLeft: 15,
    '& > select': {
    }
  }
})(NativeSelect);

const StyledFormControl = withStyles({
  root: style
})(FormControl);

const StyledButton = withStyles({
  root: style
})(Button);

export default class FiltrationPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yearValue: '',
      withGenres: '',
      location: props.location
    };

    autoBind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { pathname } = prevState.location;

    if (pathname !== nextProps.location.pathname) {
      return {
        yearValue: '',
        withGenres: ''
      };
    }

    return null;
  }

  componentWillUnmount() {
    const { clearFiltrationParams } = this.props;

    clearFiltrationParams && clearFiltrationParams();
  }

  setFiltrationParams(e) {
    e.preventDefault();
    const { yearValue, withGenres } = this.state;
    const { setFiltrationParams } = this.props;

    // eslint-disable-next-line radix
    setFiltrationParams && setFiltrationParams({ primary_release_year: parseInt(yearValue) }, { with_genres: withGenres });
  }

  handleYearInput(event) {
    this.setState({ yearValue: event.target.value });
  }

  handleGenreSelect(event) {
    this.setState({ withGenres: event.target.value });
  }

  isButtonDisabled() {
    const { yearValue, withGenres } = this.state;
    const emptyFileds = (!yearValue && !withGenres);

    return emptyFileds;
  }

  renderYearOptions() {
    const minYear = 1883;
    const maxYear = 2020;
    const yearRange = [];

    for (let i = maxYear; i >= minYear; i--) {
      yearRange.push(i);
    }

    return yearRange.map((year) => <option key={year} value={year}>{year}</option>);
  }

  renderGenreseOptions() {
    const { genres } = this.props;

    return genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>);
  }

  render() {
    const { yearValue, withGenres } = this.state;
    const { viewport: { device } } = this.props;
    const isMobile = device === MOBILE;

    return (
      <div autoComplete="off" className={cx(CN, isMobile && `${CN}-mobile`)} noValidate>
        <StyledFormControl className={`${CN}__item`}>
          <StyledSelect
            id="demo-simple-select"
            value={yearValue}
            onChange={this.handleYearInput}
          >
            <option value="">Year</option>
            {this.renderYearOptions()}
          </StyledSelect>
        </StyledFormControl>
        <StyledFormControl className={`${CN}__item`}>
          <StyledSelect
            id="demo-simple-select"
            value={withGenres}
            onChange={this.handleGenreSelect}
          >
            <option value="">Genres</option>
            {this.renderGenreseOptions()}
          </StyledSelect>
        </StyledFormControl>
        <StyledButton
          className={`${CN}__item`}
          color="secondary"
          disabled={this.isButtonDisabled()}
          type="submit"
          variant="contained"
          onClick={this.setFiltrationParams}
        >
          Apply Filter
        </StyledButton>
      </div>
    );
  }
}
