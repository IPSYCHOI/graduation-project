
const admin = require('firebase-admin');

const serviceAccount = require("./gpchat-c3daf-firebase-adminsdk-fbsvc-24b0876c0e.json")

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount)
})
module.exports = admin;