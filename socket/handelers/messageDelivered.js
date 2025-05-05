const Message=require("../../models/message")
exports.msgDelivered=async(socket,{messageId})=>{
    if(!socket.chatId){
        return socket.emit("message-deliveredTo-error",{
            message:"no chatId Register first"
        })
    }
    try {
        await Message.findByIdAndUpdate(messageId,{
            $addToSet:{"status.deliveredTo":socket.apiData.data.id}
        })
    } catch (error) {
        socket.emit("message-deliveredTo-error",{
            message:error.message
        })
    }
}