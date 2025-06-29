const {sendChatNotification}=require("./controllers/chatNotify")
exports.notify=async(tokens,data,type)=>{
    switch (type) {
        case "chat":
            return sendChatNotification(tokens,data)
    }
}