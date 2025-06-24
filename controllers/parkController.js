const Park=require("../models/parkModel")

exports.create = async(req, res, next) => {
    const spotState= req.query.spotState || "empty"
    const spotNumber= req.query.spotNum
    if(!spotNumber){
        return res.status(404).json({
            message:" Spot Number required"
        })
    }
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
};

exports.getAll = (req, res, next) => {
    // TODO: implement get all logic
};

exports.getOne = (req, res, next) => {
    // TODO: implement get one logic
};

exports.update = async(req, res, next) => {
        const spotState= req.query.spotState 
    const spotNumber= req.query.spotNum
    if(!spotState||!spotNumber){
        return res.status(404).json({
            message:"Spot State and Spot Number required"
        })
    }
    const spotExist= await Park.findOne({spotNumber:spotNumber})
    if(!spotExist){
        return res.status(404).json({
            message:"cant find the spot"
        })
    }
    await Park.updateOne

};

exports.remove = (req, res, next) => {
    // TODO: implement remove logic
};
