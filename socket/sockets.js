const {registerUser}=require("./handelers/registerUser")
const {sendmessage}=require("./handelers/sendMessage")
const {msgDelivered}=require("./handelers/messageDelivered")
const {msgSeen}=require("./handelers/messageSeen")
exports.socketsConf=(io)=>{

    io.on("connection",(socket)=>{

        console.log("connected")

        socket.on("User-Register",async()=>{await registerUser(socket)})
        
        socket.on("Send-Message",async({text})=>{await sendmessage(socket,{text})})
        
        socket.on("Message-Delivered",async({messageId})=>{await msgDelivered (socket,{messageId})})
        
        socket.on("Message-Seen",async({messageId})=>{await msgSeen (socket,{messageId})})
        
        socket.on("disconnect",()=>{
            console.log("disconnected")
        })
    
    })
}