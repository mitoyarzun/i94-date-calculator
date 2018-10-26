import React, { Component } from 'react';
import GithubCorner from 'react-github-corner';

import { InputArea } from './InputArea';
import { TripsTable } from './Trips';
import textToTrips from './textToTrips';

import './App.css';

function Instructions () {
  return (
    <div>
      <h2>Instructions</h2>
      <p>
        Go to <a href="https://i94.cbp.dhs.gov/I94">https://i94.cbp.dhs.gov/I94</a>,
        go to "View Travel History" fill in your information and copy the table text,
        then paste it in the text area below.
      </p>
    </div>
  );
}

function Disclaimer () {
  return (
    <div>
      <h4>Disclaimer</h4>
      <small>
        The information provided on this site is not guaranteed to be accurate.
        You are encouraged to double check the data.
      </small>
    </div>
  );
}

class App extends Component {

  state = {
    trips: [],
  }

  handleProcess = (text) => {
    this.setState({
      trips: textToTrips(text),
    });
  }

  render() {
    const {
      trips,
    } = this.state;

    return (
      <div className="App">
        <Instructions />
        <InputArea onChange={this.handleProcess} />
        <TripsTable trips={trips} />
        <Disclaimer />
        <GithubCorner
          bannerColor="#999"
          href="https://github.com/mitoyarzun/i94-date-calculator"
        />
      </div>
    );
  }
}

export default App;
