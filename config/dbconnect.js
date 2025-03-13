const mongoose=require("mongoose")
require("dotenv").config()
const dbconnect=()=>{
    return mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("✅ MongoDB Connected Successfully")})
    .catch(err=>{console.log(err)})
}
exports.dbconnect=dbconnect