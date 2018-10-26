import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export const TravelTypes = {
  Arrival: 'Arrival',
  Departure: 'Departure',
};

export function dayDifference (date1, date2) {
  const diff = Math.floor(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));
  return `${diff} days`;
}

export function Trip ({ first, trip, nextTrip }) {
  let duration = '-';
  
  if (trip.travelType === TravelTypes.Departure && nextTrip) {
    duration = dayDifference(trip.parsedDate, nextTrip.parsedDate);
  }
  
  if (trip.travelType === TravelTypes.Arrival && first) {
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

export function TripsTable ({ trips }) {
  return (
    <div>
    <h2>Results</h2>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Trip type</TableCell>
            <TableCell>Port of entry</TableCell>
            <TableCell>Length of stay</TableCell>
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
    </div>
  );
}