var response = require('../lib/serverResponse')
var Child = require('../models/Child')

module.exports.init = function(app) {

    app.post('/children', function(req, res) {
        Child.create(req.body)
        .then(function (newChild) {
            return res.json(newChild)
        }, response.serverError(res))
    })

    app.post('/children/:id', function(req, res) {
        Child.update({_id: req.params.id}, req.body).exec()
        .then(function() {
            return res.json({ok: true})
        }, response.serverError(res))
    })

    app.get('/children', function(req, res) {
        Child.find({}).exec()
        .then(function (children) {
            return res.json(children)
        }, response.serverError(res))
    })
}