const eventRouter = require('express').Router()
const Event = require('../models/Event')
const User = require('../models/User')
const mongoose = require('mongoose')
const axios = require('axios')
const config = require('../utils/config')

eventRouter.get('/', async(request, response) => {
    const events = await Event.find({})
    response.status(200).json(events)
})

eventRouter.get('/:id', async(request, response) => {
    const event = await Event.findById(request.params.id)
    response.status(200).json(event)
})

eventRouter.post('/user', async ( request, response ) => {
    const body = request.body
    const events = body.events
    const retEvents = []
    for( let eventId of events ){
        const event = await Event.findById(eventId)
        retEvents.push(event)
    }
    response.status(200).json(retEvents)
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
    const googleApiKey = config.GOOGLE_KEY
    const destination = body.address

    console.log(`lat is ${destination.lat} and lng is ${destination.lng}`)
        const realDestination = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                latlng: `${destination.lat},${destination.lng}`,    
                key: googleApiKey,
            },
        });
        if (realDestination.data.status === 'OK') {
            console.log("Real destination address is ", realDestination.data.results);
        } else {
            console.error("Geocoding API error: ", realDestination.data.status);
            return res.status(400).json({ error: 'Invalid lat/lng or address not found' });
        }
        console.log("real destination address is ", realDestination.data.results[0]?.formatted_address)
        const lastAddress = realDestination.data.results[0]?.formatted_address


    const event = new Event({
        name: body.name,
        address: lastAddress,
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

