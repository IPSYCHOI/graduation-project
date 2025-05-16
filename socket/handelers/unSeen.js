const Message=require("../../models/message")
exports.unSeen=async(socket)=>{
    const chatId = socket.chatId
    const userId=socket.apiData.data.id
    const name = socket.apiData.data.name
    const avatar = socket.apiData.data.avatar
    if(!socket.chatId){
        return socket.emit("un-seen-error",{
            message:"no chatId Register first"
        })
    }
    try {
        const unSeenMsgs=await Message.countDocuments({
            chatId,
            "sender.id":{$ne:userId},
            "status.seenBy.id":{$ne:userId}
        })
        socket.emit("un-seen-success",{
            message:"done ya kbeer",
            count:unSeenMsgs
        })
    } catch (error) {
        socket.emit("un-seen-error",{
            message:error.message
        })
    }
}