const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {sysToken}=require("../middlewares/sysToken")

router.put('/update',sysToken, userController.update);

router.delete('/delete',sysToken, userController.remove);

module.exports = router;
