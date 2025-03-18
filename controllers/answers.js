const Answer=require("../models/answer")
const Question=require("../models/question")
const add=(req,res,next)=>{
    const body=req.body.body
    const questionId=req.params.questionId
    const id=req.apiData.data.id
    const avatar=req.apiData.data.avatar
    const semester=req.apiData.data.semester
    const name=req.apiData.data.name
    Question.findById(questionId)
    .then(question=>{
        if(!question){
            const error= new Error("There is no question with that id")
            error.status=404
            throw error
        }
        const answer=new Answer({
            body,
            user:{
                id,
                name,
                avatar,
                semester
            },
            questionId,
            
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
    const userId=req.apiData.data.id
    let totalAnswers
    Answer.countDocuments({questionId})
    .then(count=>{
        totalAnswers=count
        if(count==0){
            return res.status(206).json({
                message:"no answers found",
                data:[],
                totalAnswers
            })
        }else{
            return Question.findById(questionId)
            .populate({
                path:"answers",
                options:{
                    sort:{createdAt:-1},
                    skip:(currentPage-1)*perPage,
                    limit:perPage
                }
            })
        }
    })
    .then((question)=>{
        const viewIndex=question.views.indexOf(userId)
        if(viewIndex === -1){
            question.views.push(userId)
            return question.save()
        }else{
            return question
        }
    })
    .then((question)=>{
        const formatedQuestion={
            question:{
                _id:question._id,
                body:question.body,
                user:{
                    name:question.user.name,
                    avatar:question.user.avatar,
                    semester:question.user.semester
                },
                createdAt:question.createdAt
            },
            answers:question.answers.map(a=>({
                _id:a._id,
                body:a.body,
                likes:a.likes.length,
                user:{
                    name:a.user.name,
                    avatar:a.user.avatar,
                    semester:a.user.semester
                },
                createdAt:a.createdAt
            }))
            
        }
        res.status(200).json({
            message:"Fetched answers successfully!",
            data:formatedQuestion,
            totalAnswers
        })
    })
    .catch(err=>{
        next(err)
    })
}
const deleteanswer=(req,res,next)=>{
    const answerId=req.params.answerId
    const userId=req.apiData.data.id
    const role=req.apiData.data.type
    Answer.findById(answerId)
    .then((answer)=>{
        if(role==="Student"){
            if(answer.user.id!==userId){
                const error= new Error("You are not Authorized")
                error.status=403
                throw error
            }
        }
        if(!answer){
            const error= new Error("No question found")
            error.status=404
            throw error
        }
        
        return Answer.findByIdAndDelete(answerId)
    })
    .then(()=>{
        res.status(200).json({
            message:"Answer deleted successfully!"
        })
    })
    .catch(err=>{
        next(err)
    })
}
const like=(req,res,next)=>{
    const answerId=req.params.answerId
    const userId=req.apiData.data.id
    Question.findById(answerId)
    .then((answer)=>{
        if(!answer){
            const error= new Error("No answer found")
            error.status=404
            throw error
        }
        const likeIndex=answer.likes.indexOf(userId)
        let message
        if(likeIndex=== -1){
            answer.likes.push(userId)
            message="like added"
        }else{
            answer.likes.splice(likeIndex,1)
            message="like deleted"
        }
        answer.save()
        .then(()=>{
            const likes=answer.likes.length
            res.status(200).json({
                message,
                likes
            })
        })
    })
    .catch(err=>{
        next(err)
    })
}
exports.add=add
exports.like=like
exports.getQuestion=getQuestion
exports.deleteanswer=deleteanswer