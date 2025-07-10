const mongoose=require("mongoose")

const Schema=mongoose.Schema

const answerSchema=new Schema({
    body:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    user:{
        id:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        avatar:{
            type:String
        },
        semester:{
            type:Number
        },
        department:{
            type:Object
        },
        liked:{
            type:Boolean
        }
    },
    questionId:{
        type:Schema.Types.ObjectId,
        ref:"Question",
        required:true
    },
    likes:[Number],
},
{
    timestamps:true
})
module.exports=mongoose.model("Answer",answerSchema)