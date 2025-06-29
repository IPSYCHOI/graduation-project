const admin=require("../firebase/firebaseService")
exports.sendToMany=async(tokens,payload)=>{
    try {
        for (token of tokens){
            let message={
                notification:payload.notification,
                token,
                data:payload.data
            }
            await admin.messaging().send(message)
        }
    } catch (error) {
        throw error
    }
}