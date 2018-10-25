import React, { Component } from 'react';
import './App.css';

function isDate (date) {
  return date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
}

function isTravelType (type) {
  return type.match(/Arrival|Departure/);
}

function isPortOfEntry (port) {
  return port.match(/[A-Z]{3}|Unavailable/);
}

function Trip ({ trip, nextTrip }) {
  const str = `${trip.date},${trip.travelType},${trip.portOfEntry}`;
  if (trip.travelType === 'Departure' && nextTrip) {
    const duration = (trip.parsedDate - nextTrip.parsedDate) / (1000 * 60 * 60 * 24);
    return <li>{`${str},${duration} days`}</li>;
  }
  return <li>{str}</li>;
}

class App extends Component {

  constructor () {
    super();
    this.state = {
      trips: [],
    };
    this.textArea = React.createRef();
  }

  handleProcess = () => {
    const text = this.textArea.current.value;

    const trips = [];

    let currentDate = null;
    let currentTravelType = null;

    text.split(/\n/).forEach((line) => {
      if (isDate(line)) {
        currentDate = line;
      } else if (isTravelType(line)) {
        currentTravelType = line;
      } else if (isPortOfEntry(line)) {
        trips.push({
          date: currentDate,
          parsedDate: new Date(currentDate),
          travelType: currentTravelType,
          portOfEntry: line,
        });
      }
    });

    this.setState({
      trips,
    });
  }

  render() {
    const {
      trips,
    } = this.state;

    return (
      <div className="App">
        <textarea
          className="inputArea"
          onChange={this.handleProcess}
          ref={this.textArea}
        ></textarea>
        <button
          onClick={this.handleProcess}
        >
          Process
        </button>
        <br/>
        Results
        <ul className="results">
          {trips.map((trip, index) => (
            <Trip
              trip={trip}
              nextTrip={trips[index + 1]}
              key={trip.date}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
