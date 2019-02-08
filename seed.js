/* eslint-disable no-console */
require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
const seedData = require('./tests/seedData');

seedData({})
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());