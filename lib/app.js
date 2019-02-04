const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const notFound = require('./middleware/notFound');
const { bearerToken, ensureAuth } = require('./middleware/ensureUser');

app.use(express.json());
app.use(bearerToken);
app.use(notFound);
app.use(handler);

module.exports = app;