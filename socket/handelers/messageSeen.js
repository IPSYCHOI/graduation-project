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
        avatar
    }
    try {
        await Message.findByIdAndUpdate(messageId,{
            $addToSet:{"status.seenBy":user}
        })
        const message=await Message.findById(messageId)
        socket.emit("message-seen-success", {message});
        socket.to(chatId).emit("message-seen-success",{message})
    } catch (error) {
        socket.emit("message-seen-error",{
            message:error.message
        })
    }
}