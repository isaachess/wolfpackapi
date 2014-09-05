var q = require('q')
var response = require('./lib/serverResponse')
var fs = require('fs')
var async = require('async')
var express = require('express')
var expressConductor = require('express-conductor')
var app = express()
var bodyParser = require('body-parser')
var multiparty = require('connect-multiparty')
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

app.post('/users/:userId/image', multiparty(), function(req, res) {
    var file = req.files.image

    client.putFile(file.path, file.originalFilename, { 'x-amz-acl': 'public-read' }, function(err, resp) {
        var url = resp.req.url

        User.update({_id: req.params.userId}, {$set: {imageUrl: url}}).exec()
        .then(function() {
            res.json({ok: true, url: url})
        }, response.serverError(res))
    })

})

app.post('/children/:childId/image', multiparty(), function(req, res) {

})

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
