const Question=require("../models/question")
const User=require("../models/user")
const add=(req,res,next)=>{
    const body=req.body.body
    const id = req.cookies.id
    const question=new Question({
        body,
        userId:id
    })
    question.save()
    .then(()=>{
        return User.findById(id)
    })
    .then(user=>{
        user.questions.push(question._id)
        return user.save()
    })
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
    const perPage=2
    let totalQuestions
    Question.countDocuments()
    .then(count=>{
        totalQuestions=count
        return Question.find()
        .populate("userId")
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
exports.add=add
exports.getAll=getAll