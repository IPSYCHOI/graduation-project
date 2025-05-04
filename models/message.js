const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true
        },
        senderId: {
            type: Number, 
            required: true
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
            deliveredTo: [Number], 
            seenBy: [Number]
        }
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model("Message", messageSchema);
