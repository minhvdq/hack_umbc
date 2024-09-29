const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middlewares = require('./utils/middlewares')
const userRouter = require('./controllers/user')
const eventRouter = require('./controllers/event')
const loginRouter = require('./controllers/login')
const queryRouter = require('./controllers/query')

const mongoose = require('mongoose')
const path = require('path');

mongoose.set('strictQuery', false)

logger.infor(`connecting to MongoDB`)

mongoose.connect(config.MONGODB_URI).then(result => {
    logger.infor(`connected to MongoDB`,config.MONGODB_URI)
}).catch(error => logger.infor(error.message))

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use('/api/user', userRouter)
app.use('/api/event', eventRouter)
app.use('/api/login', loginRouter)
app.use('/api/query', queryRouter)
app.use(middlewares.requestLogger)
app.use(middlewares.tokenExtractor)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app