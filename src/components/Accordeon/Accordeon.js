import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const style = {
  color: 'white',
  maxWidth: '500px',
  border: '1px solid #404040',
  borderRadius: '5px',
  backgroundColor: '#282D2D',
  margin: '5px',
  '& > *': {
    color: 'white',
    fontFamily: '"Nunito-Regular"'
  }
};

const StyledExpansionPanel = withStyles({
  root: style
})(ExpansionPanel);

const StyledExpansionPanelSummary = withStyles({
  root: {
    '& > .Mui-expanded': {
      margin: 0,
      minHeight: '20px'
    },
    '& > *': {
      margin: 0,
      color: 'white'
    }
  }
})(ExpansionPanelSummary);

export default class ControlledExpansionPanels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false });
  };

  render() {
    const {
      id,
      name,
      children
    } = this.props;
    const { expanded } = this.state;

    return (
      <StyledExpansionPanel expanded={expanded === id} onChange={this.handleChange(id)}>
        <StyledExpansionPanelSummary
          aria-controls="panel1bh-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1bh-header"
        >
          <Typography className="heading">{name}</Typography>
        </StyledExpansionPanelSummary>
        <ExpansionPanelDetails>
          {children}
        </ExpansionPanelDetails>
      </StyledExpansionPanel>
    );
  }
}
