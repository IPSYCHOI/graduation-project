const mongoose=require("mongoose")

const Schema=mongoose.Schema

const answerSchema=new Schema({
    body:{
        type:String,
        required:true,
    },
    userId:{
        type:Number,
        required:true
    },
    questionId:{
        type:Schema.Types.ObjectId,
        ref:"Question",
        required:true
    },
    likes:[Number]
},
{
    timestamps:true
})
module.exports=mongoose.model("Answer",answerSchema)