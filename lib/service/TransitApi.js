const request = require('superagent');

// This is dead code. Its not used anywhere in your API
const getRoutes = () => {
  return request
    .get('https://transit.land/api/v1/stops?lat=45.51925&lon=-122.68197&r=3200')
    .then(res => {
      // Use array methods instead of for loops
      // Why do you only want the stop name?
      // Don't you also want to store the coordinates in your database?
      return res.body.stops.map(stop => stop.name);
    });
};

module.exports = {
  getRoutes
};
