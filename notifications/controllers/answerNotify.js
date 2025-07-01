const {answerTemplate}=require("../templates/answer")
const {sendToMany}=require("../services/sendToMany")

exports.sendAnswerNotification=async(tokens,data)=>{
    try {
        const template =answerTemplate(data)
        const sender=await sendToMany(tokens,template)
        return sender
    } catch (error) {
        throw error
    }
}