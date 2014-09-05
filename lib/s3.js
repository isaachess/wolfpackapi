var knox = require('knox')
var client = knox.createClient({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'wolfpackplay'
})

module.exports = client