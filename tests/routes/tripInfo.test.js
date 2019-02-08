require('dotenv').config();
const { getToken } = require('../dataHelpers');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const TripInfo = require('../../lib/models/TripInfo');
const app = require('../../lib/app');
const { createTrip } = require('../createHelpers');

describe('tripInfoRoute', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can create trip info', () => {
    return request(app)
      .post('/tripInfo')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({
        stopName: 'SW 5th & Alder',
        coordinates: [56, 234],
        comments: ['comment 1', 'comment 2']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          stopName: 'SW 5th & Alder',
          coordinates: [56, 234],
          comments: ['comment 1', 'comment 2'],
          __v: 0
        });
      });
  });

  it('can get fullTripInfo', () => {
    return createTrip('SW 5th & Alder')
      .then(() => {
        return request(app)
          .get('/tripInfo')
          .then(res => {
            expect(res.body).toEqual([{
              _id: expect.any(String),
              stopName: expect.any(String),
              coordinates: expect.any(Array),
              comments: expect.any(Array),
              __v: 0
            }]);
          });
      });
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
          stopName: 'SW 5th & Alder',
          coordinates: [3, 5],
          comments: ['comment1', 'comment2'],
          _id: _id.toString()
        });
      });
  });
  
});