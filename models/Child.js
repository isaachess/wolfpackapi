var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ChildSchema = new Schema({
    parentId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    imageUrl: String,

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    deleted: {
        type: Boolean
    }
})

module.exports =  mongoose.model('Child', ChildSchema)
