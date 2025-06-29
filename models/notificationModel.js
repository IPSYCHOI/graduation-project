const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    fcmToken:{
        type:String,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    platform:{
        type:String,
        enum:["web","android"]
    }
});
module.exports = mongoose.model('Notification', notificationSchema);
