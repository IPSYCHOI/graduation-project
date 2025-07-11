const Answer = require("../models/answer")
const Question=require("../models/question")
const {storeImage}=require("../utils/storeImage")
const add=async(req,res,next)=>{
    const body=req.body.body
    const file=req.body.image
    const id = req.apiData.data.id
    const avatar=req.apiData.data.avatar
    const semester=req.apiData.data.semester.id
    const name=req.apiData.data.name
    const department=req.apiData.data.department
    let imageUrl
    if(file){
        imageUrl=await storeImage(file)
    }
    const question=new Question({
        body,
        imageUrl,
        user:{
            id,
            name,
            avatar:`https://${avatar}`,
            semester,
            department
        }
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
    const currentPage= req.query.page || 1
    const perPage=10
    const userId=req.apiData.data.id
    let totalQuestions
    let index
    const { department, semester ,likes,myQuestions,search} = req.query
    let filter={}
    if(department){
        filter["user.department.id"]=parseInt(department)
    }
    if(semester){
        filter["user.semester"]=parseInt(semester)
    }
    if(myQuestions){
        filter["user.id"]=parseInt(userId)
    }
    if(search){
        filter["$text"]={$search:search}
    }
    Question.countDocuments(filter)
    .then(count=>{
        totalQuestions=count
        return Question.aggregate([
            {
                $match:filter
            },
            {
                $addFields:{likesCount:{$size:"$likes"}}
            },
            {
                $sort:{createdAt: -1}
            },
            {
                $skip:(currentPage-1)*perPage
            },
            {
                $limit:perPage
            }
        ])
    })
    .then((questions)=>{
        questions.map(q=>{
            index=q.likes.indexOf(userId)
            if(index!== -1){
                q.user.liked=true
            }else{
                q.user.liked=false
            }
        })
        if(likes){
            if(likes=="true"){
                questions= questions.filter(q=>(q.user.liked===true))
                totalQuestions=questions.length
                return questions
            }else{
                const error=new Error("Invalid value for 'likes'. Expected 'true' or omit the query parameter.")
                error.status=400
                throw error
            }
        }
        return questions
    })
    .then(questions=>{
        const formatedQuestion=questions.map(q=>({
            _id:q._id,
            body:q.body,
            imageUrl:q.imageUrl,
            answers:q.answers.length,
            likes:q.likes.length,
            views:q.views.length,
            user:{
                id:q.user.id,
                name:q.user.name,
                avatar:q.user.avatar,
                semester:q.user.semester,
                department:q.user.department,
                liked:q.user.liked
            },
            createdAt:q.createdAt,
        }))
        res.status(200).json({
            message:"Fetched questions successfully!",
            questions:formatedQuestion,
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
    const role=req.apiData.data.type
    Question.findById(questionId)
    .then((question)=>{
        if(role==="Student"){
            if(question.user.id!==userId){
                const error= new Error("You are not Authorized")
                error.status=403
                throw error
            }
        }
        if(!question){
            const error= new Error("No question found")
            error.status=404
            throw error
        }
       
        return Promise.all([
            Question.findByIdAndDelete(questionId),
            Answer.deleteMany({questionId})
        ])
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
const like=(req,res,next)=>{
    const questionId=req.params.questionId
    const userId=req.apiData.data.id
    Question.findById(questionId)
    .then((question)=>{
        if(!question){
            const error= new Error("No question found")
            error.status=404
            throw error
        }
        const likeIndex=question.likes.indexOf(userId)
        let message
        if(likeIndex=== -1){
            question.likes.push(userId)
            message="like added"
        }else{
            question.likes.splice(likeIndex,1)
            message="like deleted"
        }
        question.save()
        .then(()=>{
            const likes=question.likes.length
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
const MethodsHandling=(req,res,next)=>{
    res.status(405).json({ message: `${req.method} not allowed on /questions/add` });
}

exports.MethodsHandling=MethodsHandling
exports.add=add
exports.getAll=getAll
exports.like=like
exports.deletequestion=deletequestion
