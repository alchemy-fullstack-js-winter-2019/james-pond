require('dotenv').config();
// const { getComment, getToken } = require('../dataHelpers');
const request = require('supertest');
const { Types } = require('mongoose');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');

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

  it('can get fullTripInfo', () => {
    return request(app)
      .get('/tripInfo')
      .send({ stopName: 'SW 5th & Alder', coordinates: [100, 120], comments: ['hi', 'holA'] })
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