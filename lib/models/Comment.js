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

commentSchema.statics.findComments = function() {
  return this.model('Comments').aggregate([
    { $project: { text: '$text', length: { $strLenCP: '$text' } } },
    { $group: { _id: null, avg: { $avg: '$length' } } }
  ]);
};

module.exports = mongoose.model('Comment', commentSchema);