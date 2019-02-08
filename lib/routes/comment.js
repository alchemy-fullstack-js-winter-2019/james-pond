const { Router } = require('express');
const Comment = require('../models/Comment');
const { HttpError } = require('../middleware/error');
// const { ensureUser } = require('../middleware/ensureUser');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { comment, user } = req.body;
    // console.log('***REQ THAT BODY***', req.body);
    // console.log('***REQ COMMENT***', req.body.text);
    Comment 
      .create({
        comment,
        user: req.user
      })
      .then(comment => {
        res.send(comment);
      })
      .catch(next);
    console.log('***COMMENT USER***', Comment.user);
  })
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Comment
      .findById(_id)
      .select({ __v: false })
      .then(foundComment => {
        if(!foundComment) {
          return next(new HttpError(404, `No comment found with ${_id}`));
        }
        res.send(foundComment);
      })
      .catch(next);
  });