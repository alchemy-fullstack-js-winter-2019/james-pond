require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { Types } = require('mongoose');
// const { tokenize, untokenize } = require('../../lib/utils/token');

describe('User model', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    const user = new User({ username: 'connor', password: 'password' });
    console.log('here', user._id);
    expect(user.toJSON()).toEqual({ username: 'connor', password: 'password', _id: expect.any(String)});
  });
});