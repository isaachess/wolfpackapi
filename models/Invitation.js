var async = require('async')
var mongoose = require('mongoose')
var User = require('./User')
var Message = require('./Message')
var PlayDate = require('./PlayDate')
var Child = require('./Child')
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

InvitationSchema.pre('save', function(next) {
    var invite = this

    async.parallel({
        playdate: function(cb) {
            PlayDate.findOne({_id: invite.playDateId}, cb)
        },

        parent: function(cb) {
            Child.findOne({_id: invite.childId}).exec()
            .then(function(child) {
                User.findOne({_id: child.parentId}, cb)
            }, cb)
        }
    }, function(err, results) {
        if (err)
            return next(err)

        var playdate = results.playdate
        var parent = results.parent

        if (parent._id == playdate.ownerId)
            return next()

        User.findOne({_id: playdate.ownerId}).exec()
        .then(function(owner) {
            Message.sendMessage(parent.phone, owner.phone, "You've been invited to a Wolfpack playdate! http://wolfpackplay.co", next)
        }, next)

    })
})

module.exports = mongoose.model('Invitation', InvitationSchema)
