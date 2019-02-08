require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const { getToken, getComment } = require('../dataHelpers');
const { createTrip, createComment } = require('../../tests/createHelpers');
const mongoose = require('mongoose');


describe('comments', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it.only('can create a new comment', () => {
    return createComment()
      .then(comment => {
        console.log('****SOMETHING ABSURD****', comment);
        return request(app)
          .post('/comment')
          .send({
            user: expect.any(String),
            text: 'whateva'
          })
          .then(res => {
            console.log('***GONNA RES THAT BODY***', typeof res.body._id);
            expect(res.body).toEqual({
              user: expect.any(String),
              text: expect.any(String),
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('can post a comment', () => {
    return getComment()
      .then(() => {
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

  it('can get a comment by trip info id', () => {
    return createTrip('SW 5th & Alder')
      .then(createdTrip => {
        return Promise.all([
          Promise.resolve(createdTrip._id),
          request(app)
            .get(`/tripInfo/${createdTrip._id}`)
        ]);
      })
      .then(([_id, res]) =>{
        expect(res.body).toEqual({
          user: expect.any(String),
          text: expect.any(String),
          _id
        });
      });
  });
});