const Message=require("../../models/message")
exports.msgSeen=async(socket,{messageId})=>{
    const chatId=socket.chatId
    const userId=socket.apiData.data.id
    const name = socket.apiData.data.name
    const avatar = socket.apiData.data.avatar
    if(!socket.chatId){
        return socket.emit("message-seen-error",{
            message:"no chatId Register first"
        })
    }
    const user={
        id:userId,
        name,
        avatar:`https://${avatar}`
    }
    try {
        await Message.findByIdAndUpdate(messageId,{
            $addToSet:{"status.seenBy":user}
        })
        const message=await Message.findById(messageId)
        const mappedMsg={
            id:message._id,
            sender:message.sender,
            content:message.content,
            attachments:message.attachments,
            messageType:message.messageType,
            status:message.status,
            replyTo:message.messageReplyId,
            createdAt:message.createdAt
        }
        socket.emit("message-seen-success", {message:"fetched successfully",
            data:mappedMsg});
        // socket.to(chatId).emit("message-seen-success",{message:"fetched successfully",
        //     data:mappedMsg})
    } catch (error) {
        socket.emit("message-seen-error",{
            message:error.message
        })
    }
}