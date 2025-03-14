const answer = require("../models/answer")
const Answer=require("../models/answer")
const Question=require("../models/question")
const add=(req,res,next)=>{
    const body=req.body.body
    const questionId=req.cookies.questionId
    const userId=req.cookies.id
    Question.findById(questionId)
    .then(question=>{
        if(!question){
            const error= new Error("There is no question with that id")
            error.status=404
            throw error
        }
        const answer=new Answer({
            body,
            userId,
            questionId
        })
        return answer.save()
        
    })
    .then(()=>{
        res.status(200).json({
            message:"new answer added!"
        })
    })
    .catch(err=>{
        next(err)
    })
}
const getAll=(req,res,next)=>{
    const questionId=req.cookies.questionId
    const currentPage= req.query.page
    const perPage=10
    let totalAnswers
    Answer.countDocuments({questionId})
    .then(count=>{
        totalAnswers=count
        if(count==0){
            res.status(206).json({
                message:"no answers found",
                answers:[],
                totalAnswers
            })
        }else{
        return Answer.find({questionId})
        .populate({path:"userId",select:"name"})
        .skip((currentPage-1)*perPage)
        .limit(perPage)
        }
    })
    .then(answers=>{
        if(!totalAnswers==0)
        {
            res.status(200).json({
                message:"Fetched answers successfully!",
                answers,
                totalAnswers
            })
        }
    })
    .catch(err=>{
        next(err)
    })
}
exports.add=add
exports.getAll=getAll