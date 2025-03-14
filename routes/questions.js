const express = require("express")

const router=express.Router()

const questionController=require("../controllers/question")

router.post("/add",questionController.add)

module.exports=router