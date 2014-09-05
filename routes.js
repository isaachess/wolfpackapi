var q = require('q')
var async = require('async')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var connection

var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
var mongoose = require('mongoose')
mongoose.connect(MONGO_URL)

//Models what's up
var User = require('./models/User')
var Child = require('./models/Child')
var PlayDate = require('./models/PlayDate')
var Invitation = require('./models/Invitation')

app.use(bodyParser.json())

app.get('/', function(req, res) {
    async.parallel({
        users: function(done) {
            User.find({}, done)
        },
        children: function(done) {
            Child.find({}, done)
        },
        playDates: function(done) {
            PlayDate.find({}, done)
        },
        invitations: function(done) {
            Invitation.find({}, done)
        }
    }, function(err, results) {
        if (err) {
            console.log(err)
            return res.json({ok: false}, 500)
        }

        res.json(results)
    })
})

/* 
Example for creating a User

app.post('/users', function(req, res) {
    User.create(req.body, function(err, newUser) {
        if (err) {
            console.log(err)
            return res.json({ok: false}, 500)
        }

        res.json(newUser)
    })
})

Example for updating a User

app.post('/users/:userId', function(req, res) {
    User.update({_id: req.params.userId}, req.body, function(err) {
        if (err) {
            console.log(err)
            return res.json({ok: false}, 500)
        }

       res.json({ok: true})
    })
})
*/

app.listen(1337)    
