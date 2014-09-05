var q = require('q')
var response = require('./lib/serverResponse')
var fs = require('fs')
var async = require('async')
var express = require('express')
var expressConductor = require('express-conductor')
var app = express()
var bodyParser = require('body-parser')
var knox = require('knox')
var client = knox.createClient({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'wolfpackplay'
})

var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
var mongoose = require('mongoose')
mongoose.connect(MONGO_URL)

var User = require('./models/User')
var Child = require('./models/Child')
var PlayDate = require('./models/PlayDate')
var Invitation = require('./models/Invitation')

app.use(bodyParser.json())
app.use('/admin', express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    return q.all([
        User.find({}).exec(),
        Child.find({}).exec(),
        PlayDate.find({}).exec(),
        Invitation.find({}).exec()
    ])
    .spread(function (users, children, playDates, invitations) {
        var results = ({
            users: users,
            children: children,
            playDates: playDates,
            invitations: invitations
        })

        res.json(results)
    })
})

require('./controllers/user').init(app)
require('./controllers/child').init(app)
require('./controllers/playdate').init(app)
require('./controllers/invitation').init(app)

app.listen(process.env.PORT || 1337)
