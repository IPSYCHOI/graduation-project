const express = require("express")

const router=express.Router()

const {api}=require("../middlewares/fetchApi")
const {auth}=require("../middlewares/isAuth")

const questionController=require("../controllers/question")

router.post("/add",api,questionController.add)
router.get("/all",auth,questionController.getAll)

module.exports=router