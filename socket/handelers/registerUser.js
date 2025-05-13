const Chat=require("../../models/chat")
exports.registerUser=async(socket)=>{
    const userId =socket.apiData.data.id
    try {
        const chat=await Chat.find({"users.userId":userId})
        if(!chat[0]){
            const error = new Error("No chat found")
            socket.emit("user-register-error",{
                message:error.message
            })
            return socket.disconnect(true)
        }
        socket.join(chat[0]._id.toString())
        socket.chatId=chat[0]._id.toString()
        console.log(`User ${userId} joined ${chat[0].name}`)
        socket.emit("user-register-success",{
            message:`registered successfully , User ${userId} joined ${chat[0].name} , chatId ${socket.chatId}`,
        })
    } catch (error) {   
        socket.emit("user-register-error",{
            message:error.message
        })
        return socket.disconnect(true)
    }
}