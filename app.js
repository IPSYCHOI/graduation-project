const express = require("express")

const app =express()

require("dotenv").config()

const bodyBarser=require("body-parser")

const {dbconnect}=require("./config/dbconnect")

const authRouters=require("./routes/auth")

app.use(bodyBarser.json())

app.use("/auth",authRouters)
dbconnect()
.then(()=>{
    app.listen(process.env.PORT,() => console.log("🚀 Server running on port 80"))
})