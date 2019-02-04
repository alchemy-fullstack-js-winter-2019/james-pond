const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user: {
    username: String,
    password: String,
  },
// ?????
});

module.exports = mongoose.model('game', gameSchema);