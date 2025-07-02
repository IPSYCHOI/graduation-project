const Answer=require("../models/answer")
const Question=require("../models/question")
const { notify } = require("../notifications/notify")
const { getTokens } = require("../utils/getFcmTokens")
const {storeImage}=require("../utils/storeImage")
const add=async(req,res,next)=>{
    const body=req.body.body
    const file=req.body.image
    const questionId=req.params.questionId
    const id=req.apiData.data.id
    const avatar=req.apiData.data.avatar
    const semester=req.apiData.data.semester?.id || null
    const name=req.apiData.data.name
    const department=req.apiData.data.department.name
    let imageUrl
    let finalAnswer
    let questionUserId
    Question.findById(questionId)
    .then(async(question)=>{
        if(!question){
            const error= new Error("There is no question with that id")
            error.status=404
            throw error
        }
        questionUserId=question.user.id
        if(file){
            imageUrl=await storeImage(file)
        }
        const answer=new Answer({
            body,
            imageUrl,
            user:{
                id,
                name,
                avatar:`https://${avatar}`,
                semester,
                department
            },
            questionId,
        })
        return answer.save()
        .then((answer)=>{
            finalAnswer=answer
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
    .then(async()=>{
        const words=finalAnswer.body.split(/\s+/).slice(0, 5).join(' ');
        const dataBody = words + (finalAnswer.body.split(/\s+/).length > 5 ? "..." : "");
        const data={
            senderName:finalAnswer.user.name,
            body:dataBody
        }
        const ids=[]
        if(questionUserId!=finalAnswer.user.id){
            ids.push(questionUserId)
            const tokens=await getTokens(ids)
            notify(tokens,data,"answer")
        }
    })
    .catch(err=>{
        next(err)
    })
}
const getQuestion=async(req,res,next)=>{
    const questionId=req.params.questionId
    const currentPage= req.query.page || 1
    const perPage=10
    const userId=req.apiData.data.id

    let index
    let totalAnswers
    const qu= await Question.findById(questionId).populate({
                path:"answers",
                options:{
                    skip:(currentPage-1)*perPage,
                    limit:perPage
                }
            })
    if(!qu){
        return res.status(404).json({
            message:"No Question found !"
        })
    }
    Answer.countDocuments({questionId})
    .then(count=>{
        totalAnswers=count
        if(count==0){
              res.status(206).json({
                message:"no answers found",
                data:{
                question:{
                _id:qu._id,
                body:qu.body,
                imageUrl:qu.imageUrl,
                user:{
                    id:qu.user.id,
                    name:qu.user.name,
                    avatar:qu.user.avatar,
                    semester:qu.user.semester,
                    department:qu.user.department,
                },
                createdAt:qu.createdAt
            },
            answers:[]
                },
                totalAnswers
            })
            return Promise.reject(null)
        }else{
            return qu
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
        question.answers.sort((a, b) => b.likes.length - a.likes.length);
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
                    id:question.user.id,
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
                    id:a.user.id,
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