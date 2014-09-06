var multiparty = require('connect-multiparty')
var async = require('async')
var s3 = require('../lib/s3')
var response = require('../lib/serverResponse')
var User = require('../models/User')

module.exports.init = function(app) {

    app.get('/users', function(req, res) {
        User.find({}).exec()
        .then(function (users) {
            return res.json(users)
        }, response.serverError(res))
    })

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

    app.post('/users/:id/image', multiparty(), function(req, res) {
        var file = req.files.image

        s3.putFile(file.path, file.originalFilename, { 'x-amz-acl': 'public-read' }, function(err, resp) {
            var url = resp.req.url

            User.update({_id: req.params.id}, {$set: {imageUrl: url}}).exec()
            .then(function() {
                res.json({ok: true, url: url})
            }, response.serverError(res))
        })

    })

    app.post('/users/:userId/friends', function(req, res) {
        User.update({_id: req.params.userId}, {
            $addToSet: {
                frends: {
                    $each: req.params.friendIds
                }
            }
        }, function(err) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

            res.json({ok: true})
        })
    })

    app.get('/users/:userId/friends', function(req, res) {
        var numbers = req.query.numbers

        async.map(numbers, function(number, cb) {
            User.findOne({phone: number}, function(err, user) {
                cb(err, user)
            })
        }, function(err, users) {
            if (err) {
                console.log(err)
                return res.json({ok: true})
            }

            res.json(users.filter(function(user) { return !!user}))
        })
    })

}
