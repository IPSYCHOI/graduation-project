const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const {api}=require("../middlewares/fetchApi")
const {sysToken}=require("../middlewares/sysToken")

router.post('/save',api,notificationController.save);
router.post('/announ',sysToken,notificationController.announ)



module.exports = router;
