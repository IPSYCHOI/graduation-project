const User=require("../models/user")

const signup=(req,res,next)=>{
    const name=req.body.name
    const user=new User({
        name:name
    })
    user.save()
    .then((user)=>{
        res.status(201).json({
            message:"user created"
        })
    })
    .catch(err=>{
        next(err)
    })

}
exports.signup=signup