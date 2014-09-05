var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PlayDateSchema = new Schema({
    date: {
        type: Date,
        required: true
    },

    ownerId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    location: {
        type: String,
        required: true
    }
})

module.exports =  mongoose.model('PlayDate', PlayDateSchema)
