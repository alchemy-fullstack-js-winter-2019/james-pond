const { Router } = require('express');
const Comment = require('../models/Comment');
const { HttpError } = require('../middleware/error');
const { ensureUser } = require('../middleware/ensureUser');

module.exports = Router()
  .post('/', ensureUser, (req, res, next) => {
    const { comment, user } = req.body;

    Comment 
      .create({
        comment,
        user: req.user._id
      })
      .then(comment => res.send(comment))
      .catch(next);
  });