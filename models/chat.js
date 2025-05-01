const mongoose=require("mongoose")

const Schema=mongoose.Schema

const chatSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    users:[
        {
            userId:{
                type:Number,
                required:true
            },
            isAdmin:{
                type:Boolean,
                default:false
            }
        }
    ]
},
{
    timestamps:true
})
module.exports=mongoose.model("Chat",chatSchema)