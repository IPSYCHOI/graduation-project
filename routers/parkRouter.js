const express = require('express');
const router = express.Router();
const parkController = require('../controllers/parkController');


router.post('/add', parkController.create);

// Read all
router.get('/', parkController.getAll);

// Read one
router.get('/:id', parkController.getOne);

// Update
router.put('/update', parkController.update);

// Delete
router.delete('/:id', parkController.remove);

module.exports = router;
