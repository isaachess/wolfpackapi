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

    app.del('/users/:id', function(req, res) {
        User.remove({_id: req.params.id}).exec()
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
        async.parallel([

            updateMainFriend,

            updateOtherFriends

        ], function(err) {
            if (err) {
                console.log(err)
                return res.json({ok: false})
            }
            res.json({ok: true})
        })

        function updateMainFriend(cb) {
            updateFriends(req.params.userId, req.body.friendIds, cb)
        }

        function updateOtherFriends(cb) {
            async.each(req.body.friendIds, function(friendId, done) {
                updateFriends(friendId, [req.params.userId], done)
            }, cb)
        }

        function updateFriends(_id, friendIds, cb) {
            User.update({_id: _id}, {
                $addToSet: {
                    friends: {
                        $each: friendIds
                    }
                }
            }, cb)
        }

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
