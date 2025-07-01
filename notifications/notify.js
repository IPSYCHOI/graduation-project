const {sendChatNotification}=require("./controllers/chatNotify")
const {sendAnnounNotification}=require("./controllers/announNotify")
exports.notify=async(tokens,data,type)=>{
    switch (type) {
        case "chat":
            return sendChatNotification(tokens,data)
        case "announ":
            return sendAnnounNotification(tokens,data)

    }
}