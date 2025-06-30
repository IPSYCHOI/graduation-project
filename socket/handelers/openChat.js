const Message=require("../../models/message")
const {onlineIds}=require("./openChatMap")
const {unSeen}=require("./unSeen")

exports.openChat=async(socket)=>{
    const chatId = socket.chatId
    const userId=socket.apiData.data.id
    const name = socket.apiData.data.name
    const avatar = socket.apiData.data.avatar
    if(!onlineIds.has(chatId)){
        onlineIds.set(chatId,[])
    }
    if(!socket.chatId){
        return socket.emit("open-chat-error",{
            message:"no chatId Register first"
        })
    }
    const userObj={
        id:userId,
        name,
        avatar
    }
    try {
        await Message.updateMany({
            chatId,
            "sender.id":{$ne:userId},
            $or:[
                {"status.deliveredTo.id":{$ne:userId}},
                {"status.seenBy.id":{$ne:userId}}
            ]
        },
        {
            $addToSet:{
                "status.deliveredTo": userObj,
                "status.seenBy": userObj
            }
        })
        socket.emit("open-chat-success", {
                message: "All messages marked as delivered and seen"
        });
        socket.to(chatId).emit("open-chat-info",{
            message:"New User open the fuckin chat",
            sender:userObj
        })
        onlineIds.get(chatId).push(userId)
        await unSeen(socket)
    }catch (error) {
        socket.emit("open-chat-error",{
            message:error.message
        })
    }
}