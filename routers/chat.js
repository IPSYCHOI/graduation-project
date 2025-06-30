const express = require("express")

const router=express.Router()

const {api}=require("../middlewares/fetchApi")

const chatController=require("../controllers/chat")

const messageController=require("../controllers/messages")

const {methodH}=require("../middlewares/methodHandler")

router.post("/add",api,methodH("post"),chatController.addStudent)
router.get("/group",api,methodH("get"),chatController.getGroup)
router.get("/group/detials",api,methodH("get"),chatController.getGroupDetails)
router.get("/messages",api,methodH("get"),messageController.getMessages)
router.get("/messages/old/:lastMessageId",api,methodH("get"),messageController.getOldestMessages)

//dev mood
router.post("/addchat",methodH("post"),chatController.addChat)

//gassy

//TODO: Add user to chat  & ass admin
//TODO: DEL user form chat 
//TODO: upgrade users & delete chat msgs



module.exports=router