const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({email: body.email})
    const passwordCorrect = user === undefined ? false : await bcrypt.compare(body.password, user.passwordHash)
    if(!( user && passwordCorrect)){
        response.status(400).json({error: "invalid username or password"})
        return
    }
    const userForToken = {
        email: user.email,
        id: user._id
    }
    response.status(200).json({ name: user.name, email: user.email, phoneNumber: user.phoneNumber, address: user.address, id: user._id, events: user.events })
})

module.exports = loginRouter