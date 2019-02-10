const User = require('../lib/models/User');
const Comment = require('../lib/models/Comment');
const Chance = require('chance');
const chance = new Chance();

const DEFAULT_TOTAL_USERS = 10;
const DEFAULT_TOTAL_COMMENTS = 100;

// What about creating trips here??
module.exports = ({
  totalUsers = DEFAULT_TOTAL_USERS,
  totalComments = DEFAULT_TOTAL_COMMENTS,
}) => {
  return Promise.all(
    [...Array(totalUsers)].map((ele, i) => User.create({ username: `seed${i}`, password: 'password' }))
  )
    .then(users => {
      return Promise.all(
        [...Array(totalComments)].map(() => {
          return Comment.create({
            user: chance.pickone(users)._id
          });
        })
      );
    });
};
