const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: String,
},
{
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash,
      delete ret.__v;
    }
  }
});

userSchema
  .virtual('password')
  .set(function(password) {
    this._tempPassword = password;
  });

userSchema
  .pre('save', function(next) {
    hash(this._tempPassword)
      .then(hashedPassword => {
        this.passwordHash = hashedPassword;
        next();
      });
  });

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

userSchema.methods.authToken = function() {
  const user = this.toJSON();
  return tokenize(user);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
