var mongoose = require('mongoose')
var Schema = mongoose.Schema

var InvitationSchema = new Schema({
    childId: {
        required: true,
        type: Schema.Types.ObjectId
    },

    confirmed: {
        required: true,
        type: String,
        enum: ['confirmed', 'rejected', 'invited']
    },

    playDateId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Invitation', InvitationSchema)
