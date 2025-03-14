const mongoose=require("mongoose")

const Schema=mongoose.Schema

const answerSchema=new Schema({
    body:{
        type:String,
        required:false,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    questionId:{
        type:Schema.Types.ObjectId,
        ref:"Question",
        required:true
    }
},
{
    timestamps:true
})
module.exports=mongoose.model("Answer",answerSchema)