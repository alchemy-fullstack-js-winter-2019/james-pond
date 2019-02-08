require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const TripInfo = require('../../lib/models/TripInfo');
const app = require('../../lib/app');
const request = require('supertest');


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
      _id: expect.any(String), 
      stopName: expect.any(String),
      coordinates: expect.any(Array),
      comments: expect.any(Array)
    });
  });

  it('has a required stop name', () => {
    const stop = new TripInfo({ stopName: '5th & Alder' });
    expect(stop.stopName).toEqual(expect.any(String));
  });

  it('gets stop by id', () => {
    return TripInfo.create({ stopName: 'SW 5th & Alder', coordinates: [3, 5], comments: ['comment1', 'comment2'] })
      .then(createdTrip => {
        return Promise.all([
          Promise.resolve(createdTrip._id),
          request(app)
            .get(`/tripInfo/${createdTrip._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          stopName: expect.any(String),
          coordinates: expect.any(Array),
          comments: expect.any(Array),
          _id: expect.any(String)
        });
      });
  });
});