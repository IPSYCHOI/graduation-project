const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const {api}=require("../middlewares/fetchApi")
const {sysToken}=require("../middlewares/sysToken")

router.post('/save',api,notificationController.save);
router.post('/announ',sysToken,notificationController.announ)

//TODO: Ann Route => body => ids Array , type=Anal , senderName, body


module.exports = router;
