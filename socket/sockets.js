const {registerUser}=require("./handelers/registerUser")
const {sendmessage}=require("./handelers/sendMessage")
exports.socketsConf=(io)=>{

    io.on("connection",(socket)=>{

        console.log("connected")

        socket.on("UserRegister",async()=>{await registerUser(socket)})
        
        socket.on("sendMessage",async(text)=>{await sendmessage(socket,text)})
        
        socket.on("disconnect",()=>{
            console.log("disconnected")
        })
    
    })
}