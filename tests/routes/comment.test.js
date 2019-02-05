require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const { getToken, getComment } = require('../dataHelpers');

describe('comments', () => {
  it('can post a comment', () => {
    return getComment()
      .then(comment => {
        return request(app)
          .post('/comments')
          .send({ trip: trip._id, comment: 'whateva' })
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body).toEqual({
              commentBy: expect.any(String),
              comment: 'whateva',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
});