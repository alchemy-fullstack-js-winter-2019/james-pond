require('dotenv').config();
const { Router } = require('express');
const TripInfo = require('../models/TripInfo');
const { ensureUser } = require('../middleware/ensureUser');
const connect = require('../../lib/utils/connect');

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
      .then(TripInfo => res.send(TripInfo))
      .catch(next);
  });

// .get('/', (req, res, next) => {
//   const tripInfo = { stopName: 'SW 5th & Alder', coordinates: [100, 120], comments: ['hi', 'holA'] };
//   TripInfo
//     .find()
//     .then(trips => trips.send(trips))
//     .catch(next);
// });
  