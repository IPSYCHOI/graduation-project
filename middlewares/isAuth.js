require("dotenv").config()
const auth=(req,res,next)=>{
    const token = req.get("Authorization")
    fetch(`${process.env.LARAVELAPI}`,{
        method:"get",
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    .then((response)=>{
        if (!response.ok) {
            const error= new Error(`HTTP Error!`);
            error.status=500
            throw error
        }else{
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}
exports.auth=auth