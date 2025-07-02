const Message=require("../../models/message")
const {unSeen}=require("./unSeen")
const {uploadBase64} = require("../../config/cloudinary")
const {notify} =require("../../notifications/notify")
const {getTokens}=require("../../utils/getChatTokens")
const {onlineIds}=require("./openChatMap")
const Chat=require("../../models/chat")
exports.sendmessage=async(socket,{text=null,replyTo,attachments=null},io)=>{
    const chatId=socket.chatId
    const userId=socket.apiData.data.id
    const name = socket.apiData.data.name
    const avatar = socket.apiData.data.avatar
    if(!chatId){
        return socket.emit("send-message-error",{
            message:"no chatId Register first"
        })
    }
    let hasVoice = false;
    let messageType="text"

    if (attachments) {
        for (const att of attachments) {
            if (att.type === "voice") {
                hasVoice = true;
                break;
            }
        }
    }
    if(attachments&&!text&&!hasVoice) messageType="mediaOnly"

    if(hasVoice&&text){
        return socket.emit("send-message-error",{
            code:400,
            message:"It is can't be text and voice in same message "
        })
    }
    if(!attachments&&!text){
        return socket.emit("send-message-error",{
            code:400,
            message:"The message can't be empty "
        })
    }
    
    let attArray=[]
    if(attachments){
        for(const att of attachments) {
            let result
            let attType="file"
            if(att.type==="file"){
                result = await uploadBase64(att.base64,att.name);
                attArray.push({fileUrl:att.base64,fileType:attType,name:att.name||null})
            }else{
                result = await uploadBase64(att.base64);
               
                if (["jpg", "jpeg", "png", "webp", "gif", "bmp"].includes(result.format)) {
                    attType = "image";
                }
                else if (["mp4", "mov", "avi", "mkv", "webm"].includes(result.format)) {
                    attType = "video";
                }
                if(["mp3", "ogg", "wav", "m4a"].includes(result.format)){
                    attType="voice"
                    hasVoice=true
                    messageType="voice"
                }
                attArray.push({fileUrl:result.secure_url,fileType:attType,name:att.name||null})
            }
            
        }
    }

    const sender={
        id:userId,
        name,
        avatar
    }
    try {
        const message=new Message({
            chatId,
            sender,
            content:text,
            attachments:attArray,
            messageType,
            messageReplyId:replyTo
        })
        await message.save()
        const mappedMsg={
            id:message._id,
            sender:message.sender,
            content:message.content,
            attachments:message.attachments,
            messageType:message.messageType,
            status:message.status,
            replyTo:message.messageReplyId,
            createdAt:message.createdAt
        }
        await unSeen(socket)
        socket.to(chatId).emit("recieve-message",{
            message:"fetched successfully",
            data:mappedMsg
        })
        socket.emit("recieve-message",{message:"fetched successfully",
            data:mappedMsg
        })
        const allChatSockets=await io.in(chatId).fetchSockets()
        for(s of allChatSockets){
            await unSeen(s)
        }
        if(!onlineIds.has(chatId)){
            onlineIds.set(chatId,[])
        }
        const tokens= await getTokens(chatId,userId,onlineIds.get(chatId))
        const chat = await Chat.findById(chatId)
        const nData={
            senderName:name,
            type:messageType,
            content:text,
            chatId,
            chatName:chat.name,
            imageUrl:chat.imageUrl
        }
        await notify(tokens,nData,"chat")
    } catch (error) {
        console.log(error)
        socket.emit("send-message-error",{
            message:error.message
        })
    }
        
}