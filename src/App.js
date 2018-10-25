import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './App.css';

const TravelTypes = {
  Arrival: 'Arrival',
  Departure: 'Departure',
};

function dayDifference (date1, date2) {
  const diff = Math.floor(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));
  return `${diff} days`;
}

function isDate (date) {
  return date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
}

function isTravelType (type) {
  return type === TravelTypes.Arrival || type === TravelTypes.Departure;
}

function isPortOfEntry (port) {
  return port.match(/[A-Z]{3}|Unavailable/);
}

function textToTrips (text) {
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

  return trips;
}

function Instructions () {
  return (
    <div>
      Go to <a href="https://i94.cbp.dhs.gov/I94">https://i94.cbp.dhs.gov/I94</a>,
      go to "View Travel History" fill in your information and copy the table text,
      then paste it in the text area below.
    </div>
  );
}

function Trip ({ first, trip, nextTrip }) {
  let duration = '-';

  if (trip.travelType === TravelTypes.Departure && nextTrip) {
    duration = dayDifference(trip.parsedDate, nextTrip.parsedDate);
  }

  if (first) {
    duration = dayDifference(trip.parsedDate, new Date());
  }

  return (
    <TableRow>
      <TableCell>
        {trip.date}
      </TableCell>
      <TableCell>
        {trip.travelType}
      </TableCell>
      <TableCell>
        {trip.portOfEntry}
      </TableCell>
      <TableCell>
        {duration}
      </TableCell>
    </TableRow>
  )
}

function TripsTable ({ trips }) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Trip type</TableCell>
            <TableCell>Port of entry</TableCell>
            <TableCell>Trip length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map((trip, index) => (
            <Trip
              key={trip.date}
              trip={trip}
              first={index === 0}
              nextTrip={trips[index + 1]}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

class InputArea extends Component {
  
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

class App extends Component {

  constructor () {
    super();
    this.state = {
      trips: [],
    };
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
        <h2>Instructions</h2>
        <Instructions />
        <h2>Input</h2>
        <InputArea onChange={this.handleProcess} />
        <h2>Results</h2>
        <TripsTable trips={trips} />
      </div>
    );
  }
}

export default App;
