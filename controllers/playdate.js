var response = require('../lib/serverResponse')
var PlayDate = require('../models/PlayDate')

module.exports.init = function(app) {

    app.post('/playdates', function(req, res) {
        PlayDate.create(req.body)
        .then(function (newPlayDate) {
            return res.json(newPlayDate)
        }, response.serverError(res))
    })

    app.post('/playdates/:id', function(req, res) {
        PlayDate.update({_id: req.params.id}, req.body).exec()
        .then(function() {
            return res.json({ok: true})
        }, response.serverError(res))
    })

    app.get('/playdates', function(req, res) {
        PlayDate.find({}).exec()
        .then(function (playdates) {
            return res.json(playdates)
        }, response.serverError(res))
    })

    app.del('/playdates/:id', function(req, res) {
        PlayDate.remove({_id: req.params.id}).exec()
        .then(function() {
            return res.json({ok: true})
        }, response.serverError(res))
    })

}