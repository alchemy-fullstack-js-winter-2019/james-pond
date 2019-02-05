require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
// const User = require('../../lib/models/User');
// const { Types } = require('mongoose');
// const { tokenize, untokenize } = require('../../lib/utils/token');

describe('User model', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
    console.log('asdfasdfasdf');
  });

  it('validates a good model', () => {
    // const user = new User({ username: 'connor', password: 'password' });
    // expect(user.toJSON()).toEqual({ username: 'connor', password: 'password', _id: expect.any(Types.ObjectId) });
  });
});