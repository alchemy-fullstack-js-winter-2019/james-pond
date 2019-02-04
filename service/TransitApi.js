const request = require('superagent');

const getRoute = coordinates => {
  return request
    .get(`https://transit.land/api/v1/stops/${coordinates}`)
    .then(res => {
         coordinates: res.body.coordinates
    })
};