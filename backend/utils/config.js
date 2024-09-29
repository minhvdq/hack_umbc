require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const EMAIL_PASS = process.env.EMAIL_PASS
const GOOGLE_KEY = process.env.GOOGLE_KEY

module.exports = { MONGODB_URI, PORT, GOOGLE_KEY }