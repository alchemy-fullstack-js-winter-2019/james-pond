/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const request = require('superagent');

const getRoutes = (num) => {
  return request
    .get('https://transit.land/api/v1/stops?lat=45.51925&lon=-122.68197&r=3200')
    .then(res => {
      console.log('res here', res.body.stops);
      // start: res.body.stops
    });
    
};

module.exports = { 
  getRoutes
};