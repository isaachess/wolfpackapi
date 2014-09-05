var mongoose = require('mongoose')
var Schema = mongoose.Schema

var InvitationSchema = new Schema({
    childId: {
        required: true,
        type: String
    },

    confirmed: {
        required: true,
        type: String,
        enum: ['confirmed', 'rejected', 'invited']
    },

    playDateId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Invitation', InvitationSchema)
