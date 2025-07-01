const Chat=require("../models/chat")
const Message=require("../models/message")
exports.getMessages=async(req,res,next)=>{
    const userId =req.apiData.data.id
    let chatId
    try {
        const chat=await Chat.find({"users.userId":userId})
        if(!chat[0]){
            return res.status(404).json({
                message:"No chat found"
            })
        }
        chatId=chat[0]._id
        const messages=await Message.find({chatId}).sort({createdAt: -1}).limit(30)
        const data=messages.map(m=>{
            return{
                id:m._id,
                sender:m.sender,
                content:m.content,
                attachments:m.attachments,
                messageType:m.messageType,
                status:m.status,
                replyTo:m.messageReplyId,
                createdAt:m.createdAt
            }
        })
        res.status(200).json({
            message:"fetched the news 30 messages",
            data:data
        })
        
    } catch (error) {   
        next(error)
    }
}
exports.getOldestMessages=async(req,res,next)=>{
    const userId =req.apiData.data.id
    const lastMessageId =req.params.lastMessageId
    let chatId
    try {
        const chat=await Chat.find({"users.userId":userId})
        if(!chat[0]){
            return res.status(404).json({
                message:"No chat found"
            })
        }
        chatId=chat[0]._id
        const lastMessage = await Message.findById(lastMessageId);
        
        if (!lastMessage) {
            return res.status(404).json({ message: "Last message not found" });
        }

        const olderMessages = await Message.find({
            chatId,
            createdAt: { $lt: lastMessage.createdAt }
        })
        .sort({ createdAt: -1 }) 
        .limit(30);

        const data=olderMessages.map(m=>{
            return{
                id:m._id,
                sender:m.sender,
                content:m.content,
                attachments:m.attachments,
                messageType:m.messageType,
                status:m.status,
                replyTo:m.messageReplyId,
                createdAt:m.createdAt
            }
        })
        res.status(200).json({
            message:"fetched the next news 30 messages",
            data:data
        });
    } catch (error) {
        next(error)
    }
}