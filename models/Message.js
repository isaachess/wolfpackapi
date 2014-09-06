var mongoose = require('mongoose')
var Schema = mongoose.Schema
var twilioNumber = '18019198844'
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

var MessageSchema = new Schema({

    type: {
        type: String,
        enum: ['phone2phone', 'app2phone', 'phone2app', 'app2app']
    },

    to: String,

    from: String,

    body: {
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
    console.log("GET IT")
    client.sendMessage({
        to: message.to,
        from: twilioNumber,
        body: message.body
    }, function(err, result) {
        console.log(arguments)
        cb(err, result)
    })
}

function sendToApp(message, cb) {
    //do nothing for now
}

module.exports =  mongoose.model('Message', MessageSchema)
