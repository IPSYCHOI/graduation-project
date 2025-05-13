const Message=require("../../models/message")
exports.sendmessage=async(socket,{text})=>{
    const chatId=socket.chatId
    if(!chatId){
        return socket.emit("send-message-error",{
            message:"no chatId Register first"
        })
    }
    try {
        const message=new Message({
            chatId,
            senderId:socket.apiData.data.id,
            content:text,
        })
        await message.save()
        socket.to(chatId).emit("recieve-message",{text,messageId:message._id})
        socket.emit("recieve-message",{text})
    } catch (error) {
        socket.emit("send-message-error",{
            message:error.message
        })
    }
        
}