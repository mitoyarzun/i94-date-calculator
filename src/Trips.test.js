import {
  dayDifference,
} from './Trips';

describe('dayDifference', () => {
  it('should calculate date differences correctly', () => {
    const dates = [
      ['2018-01-01', '2018-01-10', '9 days'],
      ['2018-01-21', '2018-07-01', '161 days'],
      ['2017-03-15', '2018-10-25', '589 days'],
    ];

    dates.forEach((date) => {
      const parsedDateStart = new Date(date[0]);
      const parsedDateEnd = new Date(date[1]);
      const expectedResult = date[2];
      expect(dayDifference(parsedDateStart, parsedDateEnd)).toEqual(expectedResult);
    })
  });
});