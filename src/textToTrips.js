import { TravelTypes } from './Trips';

function isDate (date) {
  return date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
}

function isTravelType (type) {
  return type === TravelTypes.Arrival || type === TravelTypes.Departure;
}

function isPortOfEntry (port) {
  return port.match(/[A-Z]{3}|Unavailable/);
}

export default function textToTrips (text) {
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
