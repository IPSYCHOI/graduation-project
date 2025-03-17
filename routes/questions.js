const express = require("express")

const router=express.Router()

const {api}=require("../middlewares/fetchApi")

const {auth}=require("../middlewares/isAuth")

const questionController=require("../controllers/question")

const answersController=require("../controllers/answers")

router.post("/add",api,questionController.add)
router.get("/",auth,questionController.getAll)
router.get("/:questionId",auth,answersController.getQuestion)
router.post("/addanswer/:questionId",api,answersController.add)
router.delete("/delquestion/:questionId",api,questionController.deletequestion)

module.exports=router