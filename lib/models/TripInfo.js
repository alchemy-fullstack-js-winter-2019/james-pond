const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  stopName: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array
  },
  comments: { type: Array, ref: 'Comment' }
});

module.exports = mongoose.model('TripInfo', tripSchema);