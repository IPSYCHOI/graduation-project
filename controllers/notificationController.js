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
    await notify(tokens,data,type)
    res.status(200).json({
        message:"done ya gassy"
    })
    
}

