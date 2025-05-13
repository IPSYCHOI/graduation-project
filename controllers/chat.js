const {calc_year}=require("../utils/calc_year")
const Chat=require("../models/chat")

exports.addStudent=async(req,res,next)=>{
    const userId=req.body.id
    const semester=req.body.semester
    const department=req.body.department
    const type=req.body.type
    if(!(userId&&semester&&department&&type)){
        return res.status(400).json({
            message:"All fields must be provided"
        })
    }
    const year=calc_year(semester)
    let userObject
    if(type==="Student"){
        userObject={
            userId,
        }
    }else{
        userObject={
            userId,
            isAdmin:true
        }
    }
    try {
        const chat= await Chat.findOne({year,department})
        if(!chat){
            return res.status(404).json({
                message:"There is no chat found"
            })
        }
        chat.users.push(userObject)
        await chat.save()
        res.status(201).json({
            message:"user added"
        })
    } catch (error) {
        next(error)
    }
}   

exports.getGroup=async(req,res,next)=>{
    const semester=req.apiData.data.semester.id
    const department=req.apiData.data.department.id
    const year=calc_year(semester)
    try {
        const chat=await Chat.findOne({year,department})
        if(!chat){
            return res.status(404).json({
                message:"There is no chat found"
            })
        }
        const chats=await Chat.find({department})
        const mappedChats=chats.map(c=>{
            return {
                id:c._id,
                name:c.name,
                imageurl:c.imageUrl
            }
        })
        res.status(200).json({
            message:"fetched successfully",
            chatId:{
                id:chat._id,
            },
            allDepartChats:mappedChats
        })
    } catch (error) {
        next(error)
    }
}
exports.getGroupDetails=async(req,res,next)=>{
    const semester=req.apiData.data.semester.id
    const department=req.apiData.data.department.id
    const year=calc_year(semester)
    try {
        const chat=await Chat.findOne({year,department})
        if(!chat){
            return res.status(404).json({
                message:"There is no chat found"
            })
        }
        res.status(200).json({
            message:"fetched successfully",
            data:{
                name:chat.name,
                imageurl:chat.imageUrl,
                users:chat.users
            }
        })
    } catch (error) {
        next(error)
    }
}
//dev mood
exports.addChat=async(req,res,next)=>{
    const {name, year, department} = req.body 
    try {
        const newChat= new Chat({
            name,
            year,
            department
        })
        await newChat.save()
        res.send("done")
    } catch (error) {
        next(error)
    }  
}

