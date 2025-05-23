require("dotenv").config()
const api=(req,res,next)=>{
    const token = req.get("Authorization")
    fetch(`${process.env.LARAVELAPI}`,{
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
        
        req.apiData=data
        next()
    })
    .catch(err=>{
        next(err)
    })
}
exports.api=api