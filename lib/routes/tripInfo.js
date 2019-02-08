require('dotenv').config();
const { Router } = require('express');
const TripInfo = require('../models/TripInfo');
const { ensureUser } = require('../middleware/ensureUser');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', ensureUser, (req, res, next) => {
    const {
      stopName,
      coordinates,
      comments
    } = req.body;

    TripInfo.create({
      stopName,
      coordinates,
      comments
    })
      .then(trip => res.send(trip))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    TripInfo
      .find()
      .then(trips => res.send(trips))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    console.log('***FOUND TRIP***', _id)
    TripInfo
      .findById(_id)
      .select({ __v: false })
      .then(foundTrip => {
        if(!foundTrip) {
          return next(new HttpError (404, `No Trip found with ${_id}`));
        }
        res.send(foundTrip);
      })
      .catch(next);
  });
  