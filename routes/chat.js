const express = require("express")

const router=express.Router()

const {api}=require("../middlewares/fetchApi")

const chatController=require("../controllers/chat")


//TODO:api middleware
router.post("/add",chatController.addStudent)
router.get("/group",chatController.getGroup)

//dev mood
router.post("/addchat",chatController.addChat)

module.exports=router