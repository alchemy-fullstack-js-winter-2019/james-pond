const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId, // This needs to be an object Id
    ref: 'User'
  },
  // Your comments need to be attached to a TripInfo
  tripInfo: {
    type: mongoose.Types.ObjectId,
    ref: 'TripInfo'
  },
  text: {
    type: String
  }
});

module.exports = mongoose.model('Comment', commentSchema);
