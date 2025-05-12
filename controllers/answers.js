const Answer=require("../models/answer")
const Question=require("../models/question")
const {storeImage}=require("../utils/storeImage")
const add=async(req,res,next)=>{
    const body=req.body.body
    const file=req.body.image
    const questionId=req.params.questionId
    const id=req.apiData.data.id
    const avatar=req.apiData.data.avatar
    const semester=req.apiData.data.semester.id
    const name=req.apiData.data.name
    const department=req.apiData.data.department.name
    let imageUrl
    Question.findById(questionId)
    .then(async(question)=>{
        if(!question){
            const error= new Error("There is no question with that id")
            error.status=404
            throw error
        }
        if(file){
            imageUrl=await storeImage(file)
        }
        const answer=new Answer({
            body,
            imageUrl,
            user:{
                id,
                name,
                avatar,
                semester,
                department
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
    const currentPage= req.query.page || 1
    const perPage=10
    const userId=req.apiData.data.id
    let index
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
        question.answers.map(a=>{
            index=a.likes.indexOf(userId)
            if(index!== -1){
                a.user.liked=true
            }else{
                a.user.liked=false
            } 
        })
        return question
    })
    .then((question)=>{
        const formatedQuestion={
            question:{
                _id:question._id,
                body:question.body,
                imageUrl:question.imageUrl,
                user:{
                    name:question.user.name,
                    avatar:question.user.avatar,
                    semester:question.user.semester,
                    department:question.user.department,
                },
                createdAt:question.createdAt
            },
            answers:question.answers.map(a=>({
                _id:a._id,
                body:a.body,
                imageUrl:a.imageUrl,
                likes:a.likes.length,
                user:{
                    name:a.user.name,
                    avatar:a.user.avatar,
                    semester:a.user.semester,
                    department:a.user.department,
                    liked:a.user.liked
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
        if (!answer) {
                const error = new Error("No answer found");
                error.status = 404;
                throw error;
        }
        if(role==="Student"){
            if(answer.user.id!==userId){
                const error= new Error("You are not Authorized")
                error.status=403
                throw error
            }
        }
        
        return Promise.all([
            Answer.findByIdAndDelete(answerId),
            Question.findByIdAndUpdate(
                answer.questionId,
                { $pull: { answers: answer._id } }
            )
        ])
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
    Answer.findById(answerId)
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
            answer.user.liked=true
            message="like added"
        }else{
            answer.likes.splice(likeIndex,1)
            message="like deleted"
            answer.user.liked=false
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
//nvcxzcvbjkl;