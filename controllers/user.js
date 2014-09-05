var User = require('../models/User')

module.exports.init = function(app) {

    app.post('/users', function(req, res) {
        User.create(req.body, function(err, newUser) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

            res.json(newUser)
        })
    })


    app.post('/users/:userId', function(req, res) {
        User.update({_id: req.params.userId}, req.body, function(err) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

           res.json({ok: true})
        })
    })

}
