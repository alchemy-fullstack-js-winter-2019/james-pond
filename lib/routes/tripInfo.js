require('dotenv').config();
const { Router } = require('express');
const TripInfo = require('../models/TripInfo');
const { ensureUser } = require('../middleware/ensureUser');

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
  });
  