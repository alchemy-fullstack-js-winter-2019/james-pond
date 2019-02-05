// const { getUser, getToken } = require('./dataHelpers');
const request = require('supertest');
const app = require('../lib/app');

describe('app', () => {
  it('can /signup a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ username: 'test', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            username: 'test'
          },
          token: expect.any(String)
        });
      });
  });

});