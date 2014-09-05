var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ChildSchema = new Schema({
    parentId: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    }
})

module.exports =  mongoose.model('Child', ChildSchema)
