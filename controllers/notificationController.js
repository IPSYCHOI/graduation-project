const Notification=require("../models/notificationModel")

exports.save = async(req, res, next) => {
    const {token,userId,platform}=req.body
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

