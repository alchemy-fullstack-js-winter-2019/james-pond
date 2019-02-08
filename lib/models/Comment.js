const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: String,
    ref: 'User'
  },
  text: {
    type: String
  }
});

module.exports = mongoose.model('Comment', commentSchema);