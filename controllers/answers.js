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
exports.add=add