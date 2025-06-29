const Chat =require("../models/chat")
const Notification=require("../models/notificationModel")

exports.getTokens=async(chatId,senderId)=>{
    try {
        const chat= await Chat.findOne({_id:chatId})
        const chatIds= chat.users.map(u=>{return u.userId})
        const filtered=chatIds.filter(id=>{return id!==senderId})
        const tokens=await Notification.find(
            {
                userId:{$in:filtered},
                fcmToken:{$ne:null}
            },
            
        )
        const fTokins=tokens.map(t=>t.fcmToken)
        return fTokins

    } catch (error) {
        throw error
    }
}