const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    
    firstAddress:{
        type: String,
        minLength: 6,
        required: true,
    },
    
    secondAddress: {
        type: String,
    },

    city:{
        type: String,
        required: true,
        minLength: 6
    },

    state: {
        type: String,
        required: true,
    },

    postalCode:{
        type: Number,
        required: true
    },

    expiration:{
        type: Number,
        required: true
    },

    resources: [
        {
            type: String,
        }
    ],

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
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