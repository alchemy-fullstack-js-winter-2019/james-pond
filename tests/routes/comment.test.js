require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const { getToken, getComment } = require('../dataHelpers');
// const trip = require('../../lib/models/TripInfo');

describe('comments', () => {
  it.only('can post a comment', () => {
    return getComment()
      .then(something => {
        console.log('***USER***', something);
        return request(app)
          .post('/comments')
          .send({ user: user._id, text: 'whateva' })
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body).toEqual({
              user: expect.any(String),
              text: 'whateva',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
});