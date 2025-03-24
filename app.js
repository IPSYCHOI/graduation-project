require("dotenv").config()

const express = require("express")

const app =express()

const {errorHandler}=require("./middlewares/errorHandelr")

const bodyBarser=require("body-parser")

const cookieParser = require("cookie-parser");

const {dbconnect}=require("./config/dbconnect")

const questionRouters=require("./routes/questions")

app.use(cookieParser())

app.use(bodyBarser.json())

app.use("/questions",questionRouters)

dbconnect()
.then(()=>{
    app.listen(process.env.PORT,() => console.log("🚀 Server running on port 80  "))
})
app.use(errorHandler)