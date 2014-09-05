var response = require('../lib/serverResponse')
var User = require('../models/User')

module.exports.init = function(app) {

    app.post('/users', function(req, res) {
        User.create(req.body)
        .then(function (newUser) {
            return res.json(newUser)
        }, response.serverError(res))
    })

    app.post('/users/:userId', function(req, res) {
        User.update({_id: req.params.userId}, req.body)
        .then(function() {
            return res.json({ok: true})
        }, response.serverError(res))
    })

    app.get('/users', function(req, res) {
        User.find({}).exec()
        .then(function (users) {
            return res.json(users)
        }, response.serverError(res))
    })

}