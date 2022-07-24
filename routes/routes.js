const express = require('express');
const router = express.Router();
const UserModel = require('../database/models');

// Check if user has reached stream limit
router.get('/add-stream/user/:userId', (req, res) => {
    try {
        UserModel.findOne({"user_id": req.params.userId}, "name current_streams max_streams")
        .then(foundUser => {
            console.log('%s has %d active streams.', foundUser.name, foundUser.current_streams);
            const available_streams = foundUser.max_streams - foundUser.current_streams;
            if (available_streams > 0) {
                return res.status(200).json({"can_add_stream": true, "errors": null})
            } else {
                return res.status(200).json({"can_add_stream": false, "errors": null})
            }
        })
        .catch(err => res.status(404).json({"can_add_stream": null, "errors": "Unable to verify stream availability."}))
    } catch (err) { return res.status(404).json({"can_add_stream": null, "errors": "Unable to verify stream availability."})}
})

module.exports = router;