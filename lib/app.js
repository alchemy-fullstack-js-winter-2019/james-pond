/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const notFound = require('./middleware/notFound');
const { bearerToken, ensureUser } = require('./middleware/ensureUser');

app.use(express.json());
app.use(bearerToken);
app.use('/auth', connection, require('./routes/auth'));
app.use('/verify', connection, require('./routes/auth'));
app.use('/comment', connection, require('./routes/auth'));
app.use('/tripInfo', connection, require('./routes/auth'));
app.use(notFound);
app.use(handler);

module.exports = app;