var Invitation = require('../models/Invitation')

module.exports.init = function(app) {

    app.post('/invitations', function(req, res) {
        Invitation.create(req.body)
        .then(function (newInvitation) {
            return res.json(newInvitation)
        }, response.serverError(res))
    })

    app.post('/invitations/:id', function(req, res) {
        Invitation.update({_id: req.params.id}, req.body)
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

}