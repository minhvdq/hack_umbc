const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Validate email format with a specific domain (example.com)
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        // You can adjust the domain in the regex pattern as needed
    },
    phoneNumber:{
        type: String,
        required: true
    },
    passwordHash:{
        type: String,
        minLength: 6,
        required: true,
    },
    events:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
})
userSchema.plugin(uniqueValidator)

mongoose.set('toJSON', {
    transform: (doc,ret)=> {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})


module.exports = mongoose.model('User', userSchema)