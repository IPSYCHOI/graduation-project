exports.sendmessage=async(socket,text)=>{
    const chatId=socket.chatId
    if(!chatId){
        return socket.emit("send-message-error",{
            message:"no chatId Register first"
        })
    }
    try {
        socket.to(chatId).emit("recieveMessage",{text})
    } catch (error) {
        socket.emit("send-message-error",{
            message:error.message
        })
    }
        
}