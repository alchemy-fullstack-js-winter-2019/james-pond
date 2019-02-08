const { Router } = require('express');
const Comment = require('../models/Comment');
// const { HttpError } = require('../middleware/error');
// const { ensureUser } = require('../middleware/ensureUser');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { comment, user } = req.body;
    console.log('***REQBODY***', req.body);
    Comment 
      .create({
        comment,
        user: req.user._id
      })
      .then(comment => res.send(comment))
      .catch(next);
  });
  // .get('')