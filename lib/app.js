/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const notFound = require('./middleware/notFound');
const { bearerToken, ensureUser } = require('./middleware/ensureUser');

const morgan = require('morgan');

app.use(morgan('dev', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());
app.use(bearerToken);
app.use('/auth', connection, require('./routes/auth'));
app.use('/comment', connection, require('./routes/comment'));
app.use('/tripInfo', connection, require('./routes/tripInfo'));
app.use('/signin', connection, require('../tests/dataHelpers'));

app.use(notFound);
app.use(handler);

module.exports = app;