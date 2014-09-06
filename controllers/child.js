var multiparty = require('connect-multiparty')
var s3 = require('../lib/s3')
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

    app.post('/children/:id/image', multiparty(), function(req, res) {
        var file = req.files.image

        s3.putFile(file.path, file.originalFilename, { 'x-amz-acl': 'public-read' }, function(err, resp) {
            var url = resp.req.url

            Child.update({_id: req.params.id}, {$set: {imageUrl: url}}).exec()
            .then(function() {
                res.json({ok: true, url: url})
            }, response.serverError(res))
        })

    })

    app.del('/children/:id', function(req, res) {
        Child.remove({_id: req.params.id}).exec()
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