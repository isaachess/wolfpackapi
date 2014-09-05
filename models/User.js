var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    phone: {
        type: String,
        required: true
    },

    imageUrl: String,

    friends: [Schema.Types.ObjectId],

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    deleted: {
        type: Boolean
    }
})

module.exports =  mongoose.model('User', UserSchema)
