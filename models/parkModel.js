const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
    spotState:{
        required:true,
        type:String,
        enum:["empty","full"]
    },
    spotNumber:{
        required:true,
        type:Number
    }
});
module.exports = mongoose.model('Park', parkSchema);
