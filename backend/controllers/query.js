const queryRouter = require('express').Router()
const User = require('../models/User')
const Event = require('../models/Event')

const checkIntersect = (resources_1, resources_2) => {
    for( let r of resources_1 ) {
        for( let re of resources_2 ){
            if( r.toLowerCase() === re.toLowerCase() ){
                return true
            }
        }
    }
    return false
}

queryRouter.post('/', async (request, response) => {
    const body = request.body
    const resources = body.resources
    console.log("resources in back end is  " + resources)

    const allEvents = await Event.find({})

    const validEvents = []

    for( let event of allEvents ) {
        let valid = checkIntersect(resources, event.resources)
        if( valid ) {validEvents.push(event)}
    }
    console.log("valid events are ", validEvents)

    response.status(200).json(validEvents)
})

module.exports = queryRouter