const {registerUser}=require("./handelers/registerUser")
const {sendmessage}=require("./handelers/sendMessage")
const {msgDelivered}=require("./handelers/messageDelivered")
const {msgSeen}=require("./handelers/messageSeen")
const {openChat}=require("./handelers/openChat")
const {unSeen}=require("./handelers/unSeen")
const {typing} = require("./handelers/typing")
const { stopTyping } = require("./handelers/stopTyping")
exports.socketsConf=(io)=>{

    io.on("connection",(socket)=>{

        console.log("connected")

        socket.on("User-Register",async()=>{await registerUser(socket)})
        
        socket.on("Send-Message",async({text=null,replyTo=null,attachments=null})=>{await sendmessage(socket,{text,replyTo,attachments},io)})
        
        socket.on("Message-Delivered",async({messageId})=>{await msgDelivered (socket,{messageId})})
        
        socket.on("Message-Seen",async({messageId})=>{await msgSeen (socket,{messageId})})

        socket.on("Open-Chat",async()=>{await openChat(socket)})

        socket.on("Un-Seen",async()=>{await unSeen(socket)})
        
        socket.on("Typing",async({type})=>{await typing(socket,{type})})
        
        socket.on("Stop-Typing",async()=>{await stopTyping(socket)})
        
        socket.on("disconnect",()=>{
            console.log("disconnected")
        })
    
    })
}