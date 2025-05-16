exports.typing=async(socket,{type})=>{
    const chatId = socket.chatId
    const userId=socket.apiData.data.id
    const name = socket.apiData.data.name
    const avatar = socket.apiData.data.avatar
    if(!socket.chatId){
        return socket.emit("typing-error",{
            message:"no chatId Register first"
        })
    }
    const userObj={
        id:userId,
        name,
        avatar
    }
    try {
        socket.to(chatId).emit("typing-success",{
            type:type,
            user:userObj
        })
    } catch (error) {
        socket.emit("typing-error",{
            message:error.message
        })
    }
}