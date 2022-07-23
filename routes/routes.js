const express = require('express');
const router = express.Router();

// GET Request
router.get('/', function (req, res) {
    res.status(200).send('Server is up and running.')
})

module.exports = router;