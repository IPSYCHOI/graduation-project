const express = require("express")

const router=express.Router()

const {api}=require("../middlewares/fetchApi")

const chatController=require("../controllers/chat")


//TODO:api middleware
router.post("/add",chatController.addStudent)
router.get("/group",api,chatController.getGroup)
router.get("/group/detials",api,chatController.getGroupDetails)

//dev mood
router.post("/addchat",chatController.addChat)

module.exports=router