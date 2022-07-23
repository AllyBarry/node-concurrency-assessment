const express = require('express')
require('dotenv').config()

const port = process.env.PORT || 3000
const app = express(); // instance of express
const router = require('./routes/routes');

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})