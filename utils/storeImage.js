const cloudinary=require("../config/cloudinary")
let imageUrl
exports.storeImage=async(file)=>{
    const cloudinaryRes=await cloudinary.uploader.upload(file)        
    imageUrl=cloudinaryRes.secure_url
    return imageUrl
}