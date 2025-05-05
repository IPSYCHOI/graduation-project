const express = require("express")

const router=express.Router()

const {api}=require("../middlewares/fetchApi")

const chatController=require("../controllers/chat")

const messageController=require("../controllers/messages")


//TODO:api middleware
router.post("/add",chatController.addStudent)
router.get("/group",api,chatController.getGroup)
router.get("/group/detials",api,chatController.getGroupDetails)
router.get("/messages",api,messageController.getMessages)
router.get("/messages/old/:lastMessageId",api,messageController.getOldestMessages)

//dev mood
router.post("/addchat",chatController.addChat)

module.exports=router