var twilioNumber = '8019198844'

var Message = require('../models/Message')
var User = require('../models/User')
var async = require('async')

module.exports.init = function(app) {

    app.get('/messages', function(req, res) {
        var from = req.query.From.replace('+', '').replace(/^1/, '')
        var to = req.query.To.replace('+', '').replace(/^1/, '')
        var body = req.query.Body

        if (to.match(twilioNumber)) {
            getLastConvo(from, function(err, to) {
                Message.createMessage(to, from, body)
            })
        } else {
            Message.createMessage(to, from, body)
        }

    })

}

function getLastConvo(from, cb) {
    Message.findOne({to: from}).sort({_id: -1}).exec(function(err, message) {
        cb(err, message.from)
    })
}
