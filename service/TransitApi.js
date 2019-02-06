/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const request = require('superagent');

const getRoutes = () => {
  return request
    .get('https://transit.land/api/v1/stops/')
    .then(res => {
      console.log('res here', res.body.stops[0].tags);
      // start: res.body.stops
    });
    
};

module.exports = { 
  getRoutes
};