const {announTemplate}=require("../templates/announcement")
const {sendToMany}=require("../services/sendToMany")

exports.sendAnnounNotification=async(tokens,data)=>{
    try {
        const template =announTemplate(data)
        const sender=await sendToMany(tokens,template)
        return sender
    } catch (error) {
        throw error
    }
}