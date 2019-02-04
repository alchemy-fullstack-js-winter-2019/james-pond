/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const request = require('superagent');

const getRoute = (start, stop) => {
  return request
    .get(`https://transit.land/api/v1/stops/${name}`)
    .then(res => ({
      start: res.body.stops.name
    }))
    .get(`https://transit.land/api/v1/stops/${name}`)
    .then(res => ({
      stop: res.body.stops.name
    }));
    
};

module.exports = { 
  getRoute
};