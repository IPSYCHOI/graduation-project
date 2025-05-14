const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true
        },
        sender:{
            id:{
                type:Number,
                required:true
            },
            name:{
                type: String,
                required:true
            },
            avatar:{
                type: String,
                required:true
            },
        },
        content: {
            type: String,
        },
        messageType: {
            type: String,
            enum: ["text", "image", "file","voice"],
            default: "text"
        },
        fileUrl: {
            type: String 
        },
        status: {
            deliveredTo: [
            {
                id:{
                    type:Number,
                    required:true
                },
                name:{
                    type: String,
                    required:true
                },
                avatar:{
                    type: String,
                    required:true
                }
            }
        ], 
            seenBy: [
                {
                id:{
                    type:Number,
                    required:true
                },
                name:{
                    type: String,
                    required:true
                },
                avatar:{
                    type: String,
                    required:true
                }
            }
            ]
        }
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model("Message", messageSchema);
