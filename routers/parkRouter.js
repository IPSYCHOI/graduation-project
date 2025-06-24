const express = require('express');
const router = express.Router();
const parkController = require('../controllers/parkController');


router.post('/add', parkController.create);

router.get('/', parkController.getAll);

router.post('/update', parkController.update);

router.post('/delete', parkController.remove);

module.exports = router;
