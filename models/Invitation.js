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
        enum: ['Invited', 'Accepted', 'Arrived', 'Declined']
    },

    playDateId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    deleted: {
        type: Boolean
    }
})

module.exports = mongoose.model('Invitation', InvitationSchema)
