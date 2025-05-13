const Message=require("../../models/message")
exports.msgSeen=async(socket,{messageId})=>{
    const chatId=socket.chatId
    if(!socket.chatId){
        return socket.emit("message-seen-error",{
            message:"no chatId Register first"
        })
    }
    try {
        const message=await Message.findByIdAndUpdate(messageId,{
            $addToSet:{"status.seenBy":socket.apiData.data.id}
        })
        socket.emit("message-seen-success", {message});
        socket.to(chatId).emit("message-seen-success",{message})
    } catch (error) {
        socket.emit("message-seen-error",{
            message:error.message
        })
    }
}