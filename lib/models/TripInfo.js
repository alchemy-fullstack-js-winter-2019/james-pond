const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startPoint: {
    type: Array,
    required: true
  },
  endPoint: {
    type: Array,
    required: true
  },
  comment: {
    type: String, // Type ID instead
    ref: 'Comment'
  }
});

module.exports = mongoose.model('TripInfo', tripSchema);