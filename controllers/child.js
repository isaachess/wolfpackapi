var Child = require('../models/Child')

module.exports.init = function(app) {

    app.post('/children', function(req, res) {
        Child.create(req.body, function(err, newChild) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

            res.json(newChild)
        })
    })


    app.post('/children/:childId', function(req, res) {
        Child.update({_id: req.params.childId}, req.body, function(err) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

           res.json({ok: true})
        })
    })

}

