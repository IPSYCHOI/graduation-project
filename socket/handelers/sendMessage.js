const Message=require("../../models/message")
exports.sendmessage=async(socket,{text})=>{
    const chatId=socket.chatId
    const userId=socket.apiData.data.id
    const name = socket.apiData.data.name
    const avatar = socket.apiData.data.avatar
    if(!chatId){
        return socket.emit("send-message-error",{
            message:"no chatId Register first"
        })
    }
    const sender={
        id:userId,
        name,
        avatar
    }
    try {
        const message=new Message({
            chatId,
            sender,
            content:text,
        })
        await message.save()
        socket.to(chatId).emit("recieve-message",{message})
        socket.emit("recieve-message",{message})
    } catch (error) {
        socket.emit("send-message-error",{
            message:error.message
        })
    }
        
}