const express = require("express")

const router=express.Router()

const {api}=require("../middlewares/fetchApi")

const {methodH}=require("../middlewares/methodHandler")

const questionController=require("../controllers/question")

const answersController=require("../controllers/answers")

router.post("/add",api,methodH("post"),questionController.add)
router.get("/",api,methodH("get"),questionController.getAll)
router.get("/:questionId",api,methodH("get"),answersController.getQuestion)
router.post("/addanswer/:questionId",api,methodH("post"),answersController.add)
router.delete("/delquestion/:questionId",api,methodH("delete"),questionController.deletequestion)
router.delete("/delanswer/:answerId",api,methodH("delete"),answersController.deleteanswer)
router.post("/qlike/:questionId",api,methodH("post"),questionController.like)
router.post("/alike/:answerId",api,methodH("post"),answersController.like)

module.exports=router