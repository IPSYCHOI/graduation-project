const mongoose=require("mongoose")

const Schema=mongoose.Schema

const questionSchema=new Schema({
    body:{
        type:String,
        required:true,
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
        }
    },
    answers:[
        {
            type:Schema.Types.ObjectId,
            ref:"Answer",
        }
    ],
    likes:[Number],
    views:[Number],
},
{
    timestamps:true
})
module.exports=mongoose.model("Question",questionSchema)