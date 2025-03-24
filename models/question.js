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
        },
        department:{
            type:String
        },
        liked:{
            type:Boolean
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
questionSchema.index({ body: "text" });
module.exports=mongoose.model("Question",questionSchema)