const Message=require("../../models/message")
exports.msgDelivered=async(socket,{messageId})=>{
    const chatId=socket.chatId
    if(!socket.chatId){
        return socket.emit("message-deliveredTo-error",{
            message:"no chatId Register first"
        })
    }
    try {
        const message=await Message.findByIdAndUpdate(messageId,{
            $addToSet:{"status.deliveredTo":socket.apiData.data.id}
        })
        socket.emit("message-deliveredTo-success", {message});
        socket.to(chatId).emit("message-deliveredTo-success",{message})
    } catch (error) {
        socket.emit("message-deliveredTo-error",{
            message:error.message
        })
    }
}