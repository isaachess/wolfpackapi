declare var require;
var r = require('rethinkdb')
var q = require('q')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var connection
r.connect(function(err, conn) {
    connection = conn
    ready()
})

function ready() {
    app.use(bodyParser.json())

    app.get('/', function(req, res) {
        res.send('howdy yall')
    })

    app.listen(1337)    
}
