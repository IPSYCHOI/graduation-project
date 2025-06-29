const {chatTemplate}=require("../templates/chat")
const {sendToMany}=require("../services/sendToMany")

exports.sendChatNotification=async(tokens,data)=>{
    const template =chatTemplate(data)
    const sender=await sendToMany(tokens,template)
    return sender
}