const express = require('express');
const router = express.Router();
const parkController = require('../controllers/parkController');


router.post('/add', parkController.create);

// Read all
router.get('/', parkController.getAll);

// Read one
router.get('/:id', parkController.getOne);

// Update
router.post('/update', parkController.update);

// Delete
router.post('/delete', parkController.remove);

module.exports = router;
