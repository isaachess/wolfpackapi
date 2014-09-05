var multiparty = require('connect-multiparty')
var s3 = require('../lib/s3')
var response = require('../lib/serverResponse')
var User = require('../models/User')

module.exports.init = function(app) {

    app.post('/users', function(req, res) {
        User.create(req.body)
        .then(function (newUser) {
            return res.json(newUser)
        }, response.serverError(res))
    })

    app.post('/users/:id', function(req, res) {
        User.update({_id: req.params.id}, req.body).exec()
        .then(function() {
            return res.json({ok: true})
        }, response.serverError(res))
    })

    app.post('/users/:userId/image', multiparty(), function(req, res) {
        var file = req.files.image

        s3.putFile(file.path, file.originalFilename, { 'x-amz-acl': 'public-read' }, function(err, resp) {
            var url = resp.req.url

            User.update({_id: req.params.userId}, {$set: {imageUrl: url}}).exec()
            .then(function() {
                res.json({ok: true, url: url})
            }, response.serverError(res))
        })

    })

    app.get('/users', function(req, res) {
        User.find({}).exec()
        .then(function (users) {
            return res.json(users)
        }, response.serverError(res))
    })

}