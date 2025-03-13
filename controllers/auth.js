const User=require("../models/user")

const signup=(req,res,next)=>{
    const name=req.body.name
    const user=new User({
        name:name
    })
    user.save()
    .then((user)=>{
        res.status(200).json({
            message:"user created"
        })
    })
    .catch(err=>{
        console.log(err)
    })

}
exports.signup=signup