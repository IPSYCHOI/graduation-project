const express = require("express")

const router=express.Router()

const questionController=require("../controllers/question")

router.post("/add",questionController.add)
router.get("/all",questionController.getAll)

module.exports=router