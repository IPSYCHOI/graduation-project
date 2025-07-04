const Park=require("../models/parkModel")

exports.create = async(req, res, next) => {
    const spotState= req.query.spotState || "empty"
    const spotNumber= req.query.spotNum
    if(!spotNumber){
        return res.status(404).json({
            message:" Spot Number required"
        })
    }
    try {
        const spotExist= await Park.findOne({spotNumber:spotNumber})
        if(spotExist){
            return res.status(409).json({
                message:"This spot already exist"
            })
        }
        const newSpot=new Park({    
            spotState,
            spotNumber
        })
        await newSpot.save()
        res.status(201).json({
            message:"Spot created successfully"
        })
    } catch (error) {
        next(error)
    }
};

exports.getAll = async(req, res, next) => {
    try {
        const allSpots=await Park.find({})
        const spots=allSpots.map(s=>{
            return{
                id:s._id,
                spotState:s.spotState,
                spotNumber:s.spotNumber
            }
        })
        res.status(200).json({
            message:"All spots fetched",
            data:spots
        })
    } catch (error) {
        next(error)
    }
};
exports.update = async(req, res, next) => {
    const spotState= req.body.spotState 
    const sn= req.body.spotNum
    const spotNumber=parseInt(sn)
    if(!spotState||!spotNumber){
        return res.status(404).json({
            message:"Spot State and Spot Number required"
        })
    }
    try {
        const spotExist= await Park.findOne({spotNumber:spotNumber})
        if(!spotExist){
            return res.status(404).json({
                message:"cant find the spot"
            })
        }
        await Park.updateOne({spotNumber},{$set:{spotState}})
        res.status(201).json({
            message:`Spot with number ${spotNumber} now ${spotState}`
        })
    } catch (error) {
        next(error)
    }

};

exports.remove = async(req, res, next) => {
    const spotNumber= req.query.spotNum
    if(!spotNumber){
        return res.status(404).json({
            message:" Spot Number required"
        })
    }
    try {
        const spotExist= await Park.findOne({spotNumber:spotNumber})
        if(!spotExist){
            return res.status(404).json({
                message:"cant find the spot"
            })
        }
        await Park.findOneAndDelete({spotNumber})
        res.status(200).json({
            message:`spot with number ${spotNumber} deleted successfully`
        })
    } catch (error) {
        next(error)        
    }
};