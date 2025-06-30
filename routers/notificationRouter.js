const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/save', notificationController.save);

//TODO: Ann Route => body => ids Array , type=Anal , senderName, body


module.exports = router;
