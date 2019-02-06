const { getComment, getToken } = require('./dataHelpers');
const request = require('supertest');
const { Types } = require('mongoose');

const app = require('../lib/app');

describe('tripInfoRoute', () => {
  it('can get fullTripInfo', () => {
    return request(app)
      .get('/auth/tripInfo')
      .send({ stopName, coordinates, comments })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(Types.ObjectId),
          stopName: expect.any(String),
          coordinates: expect.any(Array),
          comments: expect.any(Array)
        })
      })
  })
};