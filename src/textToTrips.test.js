import textToTrips from './textToTrips';

describe('textToTrips', () => {
    it('should convert text to trips', () => {
        const text = `
1
2018-03-13
Arrival
JFK
2
2018-01-20
Departure
SEA
3
2018-01-03
Arrival
PHO
4
2017-08-17
Departure
CLT
5
2017-02-21
Arrival
SFR
6
2017-02-20
Departure
Unavailable
`;

        expect(textToTrips(text)).toMatchSnapshot();
    });
});
