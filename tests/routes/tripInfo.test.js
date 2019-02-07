require('dotenv').config();
const { getComment, getToken } = require('../dataHelpers');
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

  it.only('can create trip info', () => {
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