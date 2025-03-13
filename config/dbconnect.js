const mongoose=require("mongoose")
const dbconnect=()=>{
    return mongoose.connect("mongodb+srv://psycho:psycho.psycho@graduation.kzewb.mongodb.net/graduation")
    .then(()=>{console.log("✅ MongoDB Connected Successfully")})
    .catch(err=>{console.log(err)})
}
exports.dbconnect=dbconnect