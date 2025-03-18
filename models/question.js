const mongoose=require("mongoose")

const Schema=mongoose.Schema

const questionSchema=new Schema({
    body:{
        type:String,
        required:true,
    },
    userId:{
        type:Number,
        required:true
    },
    answers:[
        {
            type:Schema.Types.ObjectId,
            ref:"Answer",
        }
    ],
    likes:[Number]
    
},
{
    timestamps:true
})
module.exports=mongoose.model("Question",questionSchema)