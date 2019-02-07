const User = require('../lib/models/User');
const TripInfo = require('../lib/models/TripInfo');

const createUser = (username, passwordHash) => {
  return User.create({ username, passwordHash })
    .then(user => ({ ...user, _id: user._id.toString() }));
};

const createTrip = (stopName, coordinates = [5, 10], comments = ['Train delayed 20min']) => {
  return TripInfo.create({ stopName, coordinates, comments })
    .then(trip => ({ ...trip, _id: trip._id.toString() })); 
};

module.exports = {
  createUser,
  createTrip
};