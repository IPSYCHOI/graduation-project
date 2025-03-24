const mongoose=require("mongoose")
require("dotenv").config()

console.log("🔍 MONGO_LOCAL_URI:", process.env.MONGO_LOCAL_URI);
const dbconnect=()=>{
    return mongoose.connect(process.env.MONGO_LOCAL_URI)
    .then(()=>{console.log("✅ MongoDB Connected Successfully")})
    .catch(err=>{
        throw new Error("Database Connection Failed: " + err.message)
    })
}
exports.dbconnect=dbconnect