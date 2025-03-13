const mongoose=require("mongoose")

const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    questions:[
        {
            type:Schema.Types.ObjectId,
            ref:"question",
            required:false
        }
    ]
})
module.exports=mongoose.model("User",userSchema)