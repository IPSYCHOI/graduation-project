const express = require("express")

const app =express()

const bodyBarser=require("body-parser")

app.use(bodyBarser.json())

app.listen(8080)