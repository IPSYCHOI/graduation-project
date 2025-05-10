const Message=require("../../models/message")
exports.msgSeen=async(socket,{messageId})=>{
    if(!socket.chatId){
        return socket.emit("message-seen-error",{
            message:"no chatId Register first"
        })
    }
    try {
        await Message.findByIdAndUpdate(messageId,{
            $addToSet:{"status.seenBy":socket.apiData.data.id}
        })
    } catch (error) {
        socket.emit("message-seen-error",{
            message:error.message
        })
    }
}