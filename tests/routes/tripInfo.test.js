require('dotenv').config();
const { getComment, getToken } = require('../dataHelpers');
const request = require('supertest');
const { Types } = require('mongoose');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const TripInfo = require('../../lib/models/TripInfo');
const app = require('../../lib/app');

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

  const createUser = (username, passwordHash) => {
    return User.create({ username, passwordHash })
      .then(user => ({ ...user, _id: user._id.toString() }));
  };

  const createTrip = (stopName, coordinates = [5, 10], comment = ['Train delayed 20min']) => {
    return createUser('connor', 'axbxcx123x')
      .then(user => {
        return TripInfo.create({ stopName, coordinates, comment })
          .then(trip => ({ ...trip, _id: trip._id.toString() }));
      });
  };

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
    return createTrip('SW 5th & Alder', [100, 200], ['hola', 'muchachos'])
      .then(createdTrip => {
        return Promise.all([
          Promise.resolve(createdTrip),
          request(app)
            .get()
        ]);
      });
    return request(app)
      .get('/tripInfo')
      .then(res => {
        console.log('body here', res.body);
        expect(res.body).toEqual({
          _id: expect.any(Types.ObjectId),
          stopName: expect.any(String),
          coordinates: expect.any(Array),
          comments: expect.any(Array)
        });
      });
  });
});