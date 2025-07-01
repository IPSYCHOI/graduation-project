const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const {api}=require("../middlewares/fetchApi")

router.post('/save',api,notificationController.save);//TODO:make it with api
router.post('/announ',notificationController.announ)//TODO:make it with system token

//TODO: Ann Route => body => ids Array , type=Anal , senderName, body


module.exports = router;
