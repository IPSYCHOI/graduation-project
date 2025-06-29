const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/save', notificationController.save);

module.exports = router;
