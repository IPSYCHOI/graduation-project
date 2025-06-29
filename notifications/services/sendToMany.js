const admin=require("../firebase/firebaseService")
exports.sendToMany=async(tokens,payload)=>{
    const message={
        notification:payload.notification,
        tokens,
        data:payload.data
    }
    try {
        await admin.messaging().sendEachForMulticast(message)
    } catch (error) {
        throw error
    }
}