const Question=require("../models/question")
const add=(req,res,next)=>{
    const body=req.body.body
    const id = req.apiData.data.id
    const question=new Question({
        body,
        userId:id
    })
    question.save()
    .then(()=>{
        res.status(201).json({
            message:"question created successfully!",
        })
    })
    .catch(err=>{
        next(err)
    })
}
const getAll=(req,res,next)=>{
    const currentPage= req.query.page
    const perPage=10
    let totalQuestions
    Question.countDocuments()
    .then(count=>{
        totalQuestions=count
        return Question.find()
        .populate({path:"answers",select:"body"})
        .skip((currentPage-1)*perPage)
        .limit(perPage)
    })
    .then(questions=>{
        res.status(200).json({
            message:"Fetched questions successfully!",
            questions,
            totalQuestions
        })
    })
    .catch(err=>{
        next(err)
    })
}
const deletequestion=(req,res,next)=>{
    const questionId=req.params.questionId
    const userId=req.apiData.data.id
    Question.findById(questionId)
    .then((question)=>{
        if(question.userId!==userId){
            const error= new Error("You are not Authorized")
            error.status=403
            throw error
        }
        if(!question){
            const error= new Error("No question found")
            error.status=404
            throw error
        }
        
        return Question.findByIdAndDelete(questionId)
    })
    .then(()=>{
        res.status(200).json({
            message:"Question deleted successfully!"
        })
    })
    .catch(err=>{
        next(err)
    })
}
exports.add=add
exports.getAll=getAll
exports.deletequestion=deletequestion
