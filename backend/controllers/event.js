const eventRouter = require('express').Router()
const Event = require('../models/Event')
const User = require('../models/User')
const mongoose = require('mongoose')

eventRouter.get('/', async(request, response) => {
    const events = await Event.find({})
    response.status(200).json(events)
})

eventRouter.get('/:id', async(request, response) => {
    const event = await Event.findById(request.params.id)
    response.status(200).json(event)
})

eventRouter.post('/', async(request, response) => {
    const body = request.body
    let supplierId = body.id
    if( !supplierId ){
        response.status(400).json({error: "invalid request"})
        return
    }

    if( typeof supplierId === "string" ) {
        supplierId = new mongoose.Types.ObjectId(supplierId)
    }

    const supplier = await User.findById(supplierId)
    if( !supplier ){
        response.status(400).json({error: "invalid supplier"})
        return
    }

    const event = new Event({
        name: body.name,
        address: body.address,
        expiration: body.expiration,
        resources: body.resources,
        user: supplier._id
    })

    const savedEvent = await event.save()
    console.log(savedEvent)

    supplier.events.push(savedEvent._id)

    const savedSupplier = await supplier.save()

    console.log(savedSupplier)

    response.status(201).json(savedEvent)
})

eventRouter.delete('/', async(request,response) => {
    await Event.deleteMany({})
    response.status(204).send("all events deleted")
})

eventRouter.delete('/:id', async (request, response) => {
    await Event.findByIdAndRemove(request.params.id)
      response.status(204).end()
})

eventRouter.put('/:id', async (request, response ) => {
    const body = request.body

    const event = {
        name: body.name,
        address: body.address,
        expiration: body.expiration,
        resources: body.resources
    }

    const updatedEvent = await Event.findByIdAndUpdate(request.params.id, event, {new: true} )
})

module.exports = eventRouter

