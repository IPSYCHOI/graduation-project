const express = require("express")

const router=express.Router()

const answersController=require("../controllers/answers")

router.post("/add",answersController.add)

router.get("/all",answersController.getAll)

module.exports=router
