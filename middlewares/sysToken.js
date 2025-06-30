require("dotenv").config()

exports.sysToken=(req,res,next)=>{
    const sysToken=req.get("Authorization").split(" ")[1].trim();
    if(sysToken!==process.env.SYSTEM_TOKEN){
        return res.status(403).json({
            message:"User not Authorized"
        })
    }
    next()
}