const express = require("express")

const app =express()

const bodyBarser=require("body-parser")

const {dbconnect}=require("./config/dbconnect")

const authRouters=require("./routes/auth")

app.use(bodyBarser.json())

app.use("/auth",authRouters)
dbconnect()
.then(()=>{
    app.listen(8080,() => console.log("🚀 Server running on port 8080"))
})