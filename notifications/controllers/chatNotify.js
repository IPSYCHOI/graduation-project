const {chatTemplate}=require("../templates/chat")
const {sendToMany}=require("../services/sendToMany")

exports.sendChatNotification=async(senderName,data,tokens)=>{
    const template =chatTemplate(senderName,data)
    const sender=await sendToMany(tokens,template)
    return sender
}