require("dotenv").config()
exports.getUser=async(req,res,next)=>{
    const token = req.get("Authorization")
    fetch(`${process.env.LARAVELAPI}/${req.body.userCode}`,{
        method:"get",
        headers:{
            "Authorization": `${token}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        }
    })
    .then((response)=>{
        if (!response) {
            const error= new Error(`HTTP Error from gasser!`);
            error.status=500
            throw error
        }
        return response.json()
    })
    .then(data=>{
        if(!(data.code==200)){
            const error= new Error(`from gasser:${data.message}`);
            error.status=data.code
            throw error
        }
        req.user=data.data
        next()
    })
    .catch(err=>{
        next(err)
    })
}