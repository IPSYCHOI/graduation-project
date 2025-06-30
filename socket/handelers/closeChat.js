const {ids}=require("../handelers/openChat")
exports.closeChat=async(socket)=>{
    const userId=socket.apiData.data.id
    if(!socket.chatId){
        return socket.emit("close-chat-error",{
            message:"no chatId Register first"
        })
    }
    if(ids.includes(userId)){
        const index=ids.indexOf(userId)
        ids.splice(index,1)
    }
    socket.emit("close-chat-success",{
        message:"user disconnected"
    })
}