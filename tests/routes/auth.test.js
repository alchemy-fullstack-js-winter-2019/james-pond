require('../../lib/routes/auth');
require('dotenv').config();
const User = require('../../lib/models/User');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const app = require('../../lib/app');

const createUser = (username) => {
  return User.create({ username, password: 'password' });
};

describe('auth route testing', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can sign up a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ username: 'abel', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({ 
          user: {
            _id: expect.any(String),
            username: 'abel',
            password: 'password'
          },
          token: expect.any(String)
        });
      });
  
  });
});