require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const EMAIL_PASS = process.env.EMAIL_PASS

module.exports = { MONGODB_URI, PORT }