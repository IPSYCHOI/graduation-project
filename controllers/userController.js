const Qestion = require("../models/question")
const Answer = require("../models/answer")
const Chat = require("../models/chat")

exports.update = async(req, res, next) => {
    
    const userObject =req.body.user
    
    const updatedUser={
        "user.name":userObject.name,
        "user.avatar":userObject.avatar,
        "user.semester":userObject.semester.id,
        "user.department":userObject.department.name,
    }
    const filter={"user.id":userObject.id}
    try {
        await Qestion.updateMany(filter,{$set:updatedUser})    
        await Answer.updateMany(filter,{$set:updatedUser})    
        await Chat.updateMany({},
            {
                $set:{
                    "users.$[user].name":userObject.name,
                    "users.$[user].avatar":userObject.avatar,
                }
            },
            {arrayFilters:[{"user.userId":userObject.id}]}
        )    
        res.status(200).json({ message: "User updated in all collections." });
    } catch (error) {
        next(error)
    }
};

exports.remove = async(req, res, next) => {
    const userId=req.body.userId
    try {
        await Qestion.deleteMany({ "user.id": userId });
        await Answer.deleteMany({ "user.id": userId });
        await Chat.updateMany({},
            {
                $pull:{
                    users:{userId}
                }
            }
        ) 
        res.status(200).json({ message: "User removed from all collections." });
    } catch (error) {
        next(error)
    }
};
