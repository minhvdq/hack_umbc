const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    
    address:{
        type: String,
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