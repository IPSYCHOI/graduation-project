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
        const mappedMsg={
            id:message._id,
            sender:message.sender,
            content:message.content,
            status:message.status,
            createdAt:message.createdAt
        }
        socket.to(chatId).emit("recieve-message",{
            message:"fetched successfully",
            data:mappedMsg
        })
        socket.emit("recieve-message",{message:"fetched successfully",
            data:mappedMsg})
    } catch (error) {
        socket.emit("send-message-error",{
            message:error.message
        })
    }
        
}