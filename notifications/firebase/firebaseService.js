const admin = require("firebase-admin")
const serviceAccount = require("./grad-proj-doctor-firebase-adminsdk-fbsvc-6831608397.json")

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})
module.exports = admin;