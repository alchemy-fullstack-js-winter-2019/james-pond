const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  stopName: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
});

module.exports = mongoose.model('TripInfo', tripSchema);
