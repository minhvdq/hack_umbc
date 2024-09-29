const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const stateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    
    events: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Event'
        }
    ]
})
eventSchema.plugin(uniqueValidator)

mongoose.set('toJSON', {
    transform: (doc,ret)=> {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})


module.exports = mongoose.model('Event', eventSchema)