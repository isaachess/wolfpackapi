var Message = require('../models/Message')
var User = require('../models/User')
var async = require('async')

module.exports.init = function(app) {

    app.post('/messages', function(req, res) {
        console.log(req.param('Body'))
        res.header('Content-Type', 'text/xml')
        return res.send("<Response><Sms>Sup biscuits</Sms></Response>")
        var data = req.body

        async.parallel({

            to: function(cb) {
                User.findOne({phone: data.to}, cb)
            },

            from: function(cb) {
                User.findOne({phone: data.from}, cb)
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

            var message = new Message({
                from: results.from || data.from,
                to: results.to || data.to,
                message: data.message,
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

    })

}
