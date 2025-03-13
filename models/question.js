const mongoose=require("mongoose")

const Schema=mongoose.Schema

const questionSchema=new Schema({
    body:{
        type:String,
        required:true,
    },
    answer:[
        {
            type:Schema.Types.ObjectId,
            ref:"answer",
            required:false           
        }
    ]

},
{
    timestamps:true
})