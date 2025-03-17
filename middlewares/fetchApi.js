require("dotenv").config()
const api=(req,res,next)=>{
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
        }
        return response.json()
    })
    .then(data=>{
        req.apiData=data
        next()
    })
    .catch(err=>{
        next(err)
    })
}
exports.api=api