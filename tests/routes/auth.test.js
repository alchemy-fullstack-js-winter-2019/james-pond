require('dotenv').config();
require('../../lib/routes/auth');
const User = require('../../lib/models/User');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const { getUser, getToken } = require('../dataHelpers');

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
    console.log('***AUTH TEST HERE***');
    return request(app)
      .post('/auth/signup')
      .send({ username: 'abel', password: 'password' })
      .then(res => {
        console.log('id', typeof res.body.user._id, 'token', typeof res.body.token);
        console.log('***RESBODY AUTH TEST***', res.body);

        expect(res.body).toEqual({ 
          user: {
            _id: expect.any(String),
            username: 'abel'
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in a user', () => {
    return createUser('Bill')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'Bill',
            password: 'password'
          })
          .then(res => {
            console.log('hello', res.body);
            expect(res.body).toEqual({
              user: {
                _id: expect.any(String),
                username: 'Bill',
              },
              token: expect.any(String)
            });
          });
      });
  });

  it('can not sign in a user with a bad password', () => {
    return getUser({ username: 'seed1' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'seed1',
            password: 'badPassword'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });
  it('can not sign in a user with a bad username', () => {
    return request(app)
      .post('/auth/signin')
      .send({
        username: 'badUsername',
        password: 'password'
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it('has a /verify route', () => {
    return request(app)
      .get('/auth/verify')
      .set('Authorization', `Bearer ${getToken()}`)
      .then(res => {
        expect(res.body).toEqual({
          username: 'seed1',
          _id: expect.any(String)
        });
      });
  });



});