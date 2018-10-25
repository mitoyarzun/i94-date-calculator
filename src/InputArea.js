import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export class InputArea extends Component {
  
  state = {
    expanded: true,
  }

  handleChange = (text) => {
    this.toggleExpanded(false);
    this.props.onChange(text);
  }

  toggleExpanded = (expanded) => {
    this.setState({
      expanded,
    });
  }

  render() {
    const {
      expanded,
    } = this.state;

    return (
      <div className="inputArea">
        <h2>Input</h2>
        {expanded
          ? <TextField
              label="Paste travel data here"
              multiline
              rowsMax="2"
              fullWidth
              onChange={e => this.handleChange(e.target.value)}
              margin="normal"
            />
            : <button onClick={() => this.toggleExpanded(true)}>Change</button>
          }
      </div>
    );
  }
}
