var mongoose = require('mongoose')
var async = require('async')
var User = require('./User')
var Schema = mongoose.Schema
var Message
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

MessageSchema.statics.sendMessage = function(to, from, body, cb) {
    console.log("Creating message", to, from, body)
    async.parallel({
        to: function(cb) {
            User.findOne({phone: to}, cb)
        },
        from: function(cb) {
            User.findOne({phone: from}, cb)
        }
    }, function(err, results) {
        if (err) {
            return cb(err)
        }

        console.log("got results", results)

        var type = 'phone2phone'

        //if (results.from && results.to)
        //    type = 'app2app'
        //else if (results.from)
        //    type = 'app2phone'
        //else if (results.to)
        //    type = 'phone2app'
        //else
        //    type = 'phone2phone'

        from = results.from ? results.from.phone : from
        to = results.to ? results.to.phone : to

        var message = new Message({
            from: from,
            to: to,
            body: body,
            type: type
        })

        message.save(cb)
    })
}

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
    cb()
}

Message = module.exports =  mongoose.model('Message', MessageSchema)
