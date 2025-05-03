require("dotenv").config()

const express = require("express")

const app =express()

const http=require("http")

const {Server}=require("socket.io")

const {errorHandler}=require("./middlewares/errorHandelr")

const bodyBarser=require("body-parser")

const cookieParser = require("cookie-parser");

const {dbconnect}=require("./config/dbconnect")

const questionRouters=require("./routes/questions")

const chatRouters=require("./routes/chat")

const {cors}=require("./middlewares/cors")

const server = http.createServer(app)

const {socketsConf}=require("./config/sockets")

const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
})

socketsConf(io)

app.use(cookieParser())

app.use(bodyBarser.json())

app.use(cors)

app.use("/chat",chatRouters)
app.use("/questions",questionRouters)

dbconnect()

.then(()=>{
    server.listen(process.env.PORT,() => console.log("🚀 Server running on port 443"))
})
app.use(errorHandler)