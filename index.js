// index.js
const express = require('express');
const app = express();
const router = require('./routes/routes');

app.get('/', (req, res) => {
  res.status(200).send("Hello World!");
});

app.use('/', router);

module.exports = app;