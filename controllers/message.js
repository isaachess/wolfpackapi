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
                createMessage(from, to, body)
            })
        } else {
            createMessage(from, to, body)
        }

        function createMessage(from, to, body) {
            async.parallel({

                to: function(cb) {
                    User.findOne({phone: to}, cb)
                },

                from: function(cb) {
                    User.findOne({phone: from}, cb)
                }

            }, function(err, results) {
                if (err) {
                    console.log(err)
                    res.json({ok: false})
                }

                var type = ''

                if (results.from && results.to)
                    type = 'app2app'
                else if (results.from)
                    type = 'app2phone'
                else if (results.to)
                    type = 'phone2app'
                else
                    type = 'phone2phone'

                from = results.from ? results.from.phone : from
                to = results.to ? results.to.phone : to

                var message = new Message({
                    from: from,
                    to: to,
                    body: body,
                    type: type
                })

                message.save(function(err) {
                    if (err) {
                        console.log(err) 
                        res.json({ok: false}, 500)
                    }
                    res.json({ok: true})
                })
            })
        }
    })

}

function getLastConvo(from, cb) {
    Message.findOne({to: from}).sort({_id: -1}).exec(function(err, message) {
        cb(err, message.from)
    })
}
