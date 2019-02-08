/* eslint-disable no-console */
require('dotenv').config();
require('./lib/utils/connect')();
const express = require('express');
const app = require('./lib/app');
app.use(express.static('public'));

const PORT = process.env.PORT || 7890;
app.listen(PORT, () => {
  console.log('running');
});