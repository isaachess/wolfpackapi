var response = require('../lib/serverResponse')
var Invitation = require('../models/Invitation')
var PlayDate = require('../models/PlayDate')

module.exports.init = function(app) {

    app.post('/invitations', function(req, res) {
        var invite = req.body
        playDateExists(invite.playDateId)
        .then(function(hasTruePlaydate) {
            if (hasTruePlaydate) {
                var newInvitation = new Invitation(invite)
                newInvitation.save().exec()
                .then(function(newInvitation) {
                    return res.json(newInvitation)
                }, response.serverError(res))
            }
            else {
                return response.standardError(res)
            }
        })
    })

    app.post('/invitations/:id', function(req, res) {
        Invitation.update({_id: req.params.id}, req.body).exec()
        .then(function() {
            return res.json({ok: true})
        }, response.serverError(res))
    })

    app.del('/invitations/:id', function(req, res) {
        Invitation.remove({_id: req.params.id}).exec()
        .then(function() {
            return res.json({ok: true})
        }, response.serverError(res))
    })

    app.get('/invitations', function(req, res) {
        Invitation.find({}).exec()
        .then(function (invitations) {
            return res.json(invitations)
        }, response.serverError(res))
    })

    function playDateExists(playDateId) {
        return PlayDate.findOne({_id: playDateId}).exec()
        .then(function (playdate) {
            return !!playdate
        })
    }

}
