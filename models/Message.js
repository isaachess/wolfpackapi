var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MessageSchema = new Schema({

    type: {
        type: String,
        enum: ['phone2phone', 'app2phone', 'phone2app', 'app2app']
    },

    to: String,

    from: String,

    message: {
        type: String,
        required: true
    },

    sent: {
        type: Boolean,
        default: false
    },

    read: {
        type: Boolean,
        default: false
    }

})

MessageSchema.pre('save', function(next) {
    var doc = this

    if (doc.type.match("2phone")) {
        sendToTwillio(doc, function(err) {
            if (!err)
                doc.sent = true
            next(err)
        })
    } else {
        sendToApp(doc, function(err) {
            if (!err)
                doc.sent = true
            next(err)
        })
    }
})

function sendToTwillio(message, cb) {
    //send it to phone
}

function sendToApp(message, cb) {
    //do nothing for now
}

module.exports =  mongoose.model('Message', MessageSchema)
