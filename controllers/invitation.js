var Invitation = require('../models/Invitation')

module.exports.init = function(app) {

    app.post('/children', function(req, res) {
        Invitation.create(req.body, function(err, newInvitation) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

            res.json(newInvitation)
        })
    })


    app.post('/children/:childId', function(req, res) {
        Invitation.update({_id: req.params.childId}, req.body, function(err) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

           res.json({ok: true})
        })
    })

}


