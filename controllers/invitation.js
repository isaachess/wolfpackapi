var Invitation = require('../models/Invitation')

module.exports.init = function(app) {

    app.post('/invitations', function(req, res) {
        Invitation.create(req.body, function(err, newInvitation) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

            res.json(newInvitation)
        })
    })


    app.post('/invitations/:inviteId', function(req, res) {
        Invitation.update({_id: req.params.inviteId}, req.body, function(err) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

           res.json({ok: true})
        })
    })

    app.get('/invitations', function(req, res) {
        Invitation.find({}, function(err, docs) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

            return res.json(docs)
        })
    })

}


