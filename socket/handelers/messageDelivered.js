const Message=require("../../models/message")
exports.msgDelivered=async(socket,{messageId})=>{
    const chatId=socket.chatId
    const userId=socket.apiData.data.id
    const name = socket.apiData.data.name
    const avatar = socket.apiData.data.avatar
    if(!socket.chatId){
        return socket.emit("message-deliveredTo-error",{
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
            $addToSet:{"status.deliveredTo":user}
        })
        const message=await Message.findById(messageId)
        socket.emit("message-deliveredTo-success", {message});
        socket.to(chatId).emit("message-deliveredTo-success",{message})
    } catch (error) {
        socket.emit("message-deliveredTo-error",{
            message:error.message
        })
    }
}