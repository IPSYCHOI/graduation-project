const {registerUser}=require("./handelers/registerUser")
const {sendmessage}=require("./handelers/sendMessage")
const {msgDelivered}=require("./handelers/messageDelivered")
const {msgSeen}=require("./handelers/messageSeen")
exports.socketsConf=(io)=>{

    io.on("connection",(socket)=>{

        console.log("connected")

        socket.on("UserRegister",async()=>{await registerUser(socket)})
        
        socket.on("sendMessage",async({text})=>{await sendmessage(socket,{text})})
        
        socket.on("message-delivered",async({messageId})=>{await msgDelivered (socket,{messageId})})
        
        socket.on("message-seen",async({messageId})=>{await msgSeen (socket,{messageId})})
        
        socket.on("disconnect",()=>{
            console.log("disconnected")
        })
    
    })
}