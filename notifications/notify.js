const chatNotify=require("./controllers/chatNotify")
exports.notify=async(tokens,data,type)=>{
    switch (type) {
        case "chat":
            return chatNotify(tokens,data)
    }
}