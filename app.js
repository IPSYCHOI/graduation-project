require("dotenv").config()

const express = require("express")

const parkRouter = require("./routers/parkRouter")
const app =express()

const http=require("http")

const {Server}=require("socket.io")

const {errorHandler}=require("./middlewares/errorHandelr")

const bodyBarser=require("body-parser")

const cookieParser = require("cookie-parser");

const {dbconnect}=require("./config/dbconnect")

const questionRouters=require("./routers/questions")

const notificationRouter=require("./routers/notificationRouter")

const usersRouter=require("./routers/userRouter")

const chatRouters=require("./routers/chat")

const {cors}=require("./middlewares/cors")

const server = http.createServer(app)

const {socketsConf}=require("./socket/sockets")

const {socketAuth}=require("./middlewares/socketAuth")

app.use(cors)
const io = new Server(server, {
  maxHttpBufferSize: 50 * 1024 * 1024,
    cors: {
      origin: '*',
      methods: ['GET', 'POST',"PUT","DELETE"]
    }
})
io.use(socketAuth)

socketsConf(io)

app.use(cookieParser())

app.use(bodyBarser.json({limit:"50mb"}))


app.use("/chat",chatRouters)
app.use("/questions",questionRouters)
app.use('/parking', parkRouter)
app.use('/notification', notificationRouter)
app.use('/users', usersRouter)


dbconnect()

.then(()=>{
    server.listen(process.env.PORT,() => console.log("🚀 Server running on port 443"))
})
app.use(errorHandler)

