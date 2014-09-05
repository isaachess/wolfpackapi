var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    phone: {
        type: String,
        required: true
    },

    friends: [String],

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    }
})

module.exports =  mongoose.model('User', UserSchema)
