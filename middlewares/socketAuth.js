require("dotenv").config()
exports.socketAuth=(socket,next)=>{
    const token=socket.handshake.query.token
    fetch(`${process.env.LARAVELAPI}`,{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        }
    })
    .then((res)=>{
        if(!res){
            const error= new Error(`HTTP Error!`);
            error.status=500
            throw error
        }
        return res.json()
    })
    .then((data)=>{
        if(!(data.code==200)){
            const error= new Error(data.message);
            error.status=data.code
            throw error
        }
        socket.apiData=data
        next()
    })
    .catch((error)=>{
        next(error)
    })
}