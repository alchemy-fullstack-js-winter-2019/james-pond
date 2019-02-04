const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user: {
    username: String,
    password: String,
  },
  
});