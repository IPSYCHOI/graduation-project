exports.stopTyping=async(socket)=>{
    const chatId = socket.chatId
    const userId=socket.apiData.data.id
    const name = socket.apiData.data.name
    const avatar = socket.apiData.data.avatar
    if(!socket.chatId){
        return socket.emit("stop-typing-error",{
            message:"no chatId Register first"
        })
    }
    const userObj={
        id:userId,
        name,
        avatar
    }
    try {
        socket.to(chatId).emit("stop-typing-success",{
            user:userObj
        })
    } catch (error) {
        socket.emit("stop-typing-error",{
            message:error.message
        })
    }
}