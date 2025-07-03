const Notification=require("../models/notificationModel")
const {notify}=require("../notifications/notify")
const {getTokens}=require("../utils/getFcmTokens")

exports.save = async(req, res, next) => {
    const {token,platform}=req.body
    const userId=req.apiData.data.id
    try {
        await Notification.updateOne(
            {userId,platform},
            {$set:{fcmToken:token}},
            {upsert:true}
        )
        res.status(200).json({ message: "Token saved/updated successfully" });
    } catch (error) {
        next(error)
    }
};

exports.announ=async(req,res,next)=>{
    const {ids,senderName,body,type}=req.body
    const tokens=await getTokens(ids)
    const data={
        senderName,
        body
    }
    try {
        await notify(tokens,data,type)
        res.status(200).json({
            message:"done ya gassy"
        })
    } catch (error) {
        next(error)
    }
    
}
exports.remove=async(req,res,next)=>{
    const token = req.body.token
    if(!token)
        return res.status(400).json({message:"No token provided"})
    try {
        await Notification.deleteOne({fcmToken:token})
        res.status(200).json({message:"Deleted successfully"})
    } catch (error) {
        next(error)        
    }
}