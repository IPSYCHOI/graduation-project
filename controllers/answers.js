const Answer=require("../models/answer")
const Question=require("../models/question")
const add=(req,res,next)=>{
    const body=req.body.body
    const questionId=req.params.questionId
    const userId=req.apiData.data.id
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
        .then((answer)=>{
            return{answer,question}
        })
        
    })
    .then(({answer,question})=>{
        question.answers.push(answer._id)
        return question.save()
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
const getQuestion=(req,res,next)=>{
    const questionId=req.params.questionId
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
        return Question.findById(questionId)
        .populate("answers")
        .skip((currentPage-1)*perPage)
        .limit(perPage)
        }
    })
    .then((question)=>{
        if(!totalAnswers==0)
        {
            res.status(200).json({
                message:"Fetched answers successfully!",
                question,
                totalAnswers
            })
        }
    })
    .catch(err=>{
        next(err)
    })
}
exports.add=add
exports.getQuestion=getQuestion