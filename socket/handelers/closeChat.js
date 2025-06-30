const {onlineIds}=require("./openChatMap")

exports.closeChat=async(socket)=>{
    const userId=socket.apiData.data.id
    const chatId = socket.chatId
    if(!socket.chatId){
        return socket.emit("close-chat-error",{
            message:"no chatId Register first"
        })
    }
    if(onlineIds.get(chatId).includes(userId)){
        const index=onlineIds.get(chatId).indexOf(userId)
        onlineIds.get(chatId).splice(index,1)
    }
    socket.emit("close-chat-success",{
        message:"user disconnected ya fuckin"
    })
}