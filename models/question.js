const mongoose=require("mongoose")

const Schema=mongoose.Schema

const questionSchema=new Schema({
    body:{
        type:String,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{
    timestamps:true
})
module.exports=mongoose.model("Question",questionSchema)