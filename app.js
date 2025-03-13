require("dotenv").config()

const express = require("express")

const app =express()

const {errorHandler}=require("./middlewares/errorHandelr")

const bodyBarser=require("body-parser")

const {dbconnect}=require("./config/dbconnect")

const authRouters=require("./routes/auth")

app.use(bodyBarser.json())

app.use("/auth",authRouters)
dbconnect()
.then(()=>{
    app.listen(process.env.PORT,() => console.log("🚀 Server running on port 80"))
})
app.use(errorHandler)