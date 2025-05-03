const Chat = require("../models/chat")
exports.socketsConf=(io)=>{
    io.on("connection",(socket)=>{
        console.log("connected")
        socket.on("UserRegister",async(userId)=>{
            try {
                const chat=await Chat.find({"users.userId":userId})
                if(chat){
                    socket.join(chat[0]._id.toString())
                    console.log(`User ${userId} joined ${chat[0].name}`)
                }
            } catch (error) {
                throw error
            }
        })
        socket.on("disconnect",()=>{
            console.log("disconnected")
        })
    })
}