const Notification=require("../models/notificationModel")

exports.getTokens=async(ids)=>{
    const tokens=await Notification.find({
            userId:{$in:ids},
            fcmToken:{$ne:null}
    })
    return tokens
}