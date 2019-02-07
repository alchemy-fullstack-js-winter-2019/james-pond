require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
// const { tokenize, untokenize } = require('../../lib/utils/token');
const TripInfo = require('../../lib/models/TripInfo');

describe('Trip info model', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good trip model', () => {
    const trip = new TripInfo({ 
      stopName: 'SW 5th & Alder',
      coordinates: [59, 21],
      comments: ['comment1', 'comment2']
    });
    expect(trip.toJSON()).toEqual({
      _id: expect.any(Types.ObjectId), 
      stopName: expect.any(String),
      coordinates: expect.any(Array),
      comments: expect.any(Array)
    });
  });

  it.only('has a required stop name', () => {
    const stop = new TripInfo({});
    console.log('***STOPPPP***', stop);
    // const errors = stop.validateSync().errors;
    expect(stop.stopName).toEqual(expect.any(String));
  });
});