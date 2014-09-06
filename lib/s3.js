var knox = require('knox')
var crypto = require('crypto')
var client = knox.createClient({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'wolfpackplay'
})

module.exports = {
    putFile: putFile
}

function putFile(path, name, options, cb) {
    client.putFile(path, crypto.randomBytes(20).toString('hex') + '-' + name, options, cb)
}
