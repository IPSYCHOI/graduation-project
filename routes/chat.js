const express = require("express")

const router=express.Router()

const {api}=require("../middlewares/fetchApi")

const chatController=require("../controllers/chat")



module.exports=router