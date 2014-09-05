var PlayDate = require('../models/PlayDate')

module.exports.init = function(app) {

    app.post('/playdates', function(req, res) {
        PlayDate.create(req.body, function(err, newPlayDate) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

            res.json(newPlayDate)
        })
    })


    app.post('/playdates/:playdateId', function(req, res) {
        PlayDate.update({_id: req.params.playdateId}, req.body, function(err) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

           res.json({ok: true})
        })
    })

    app.get('/playdates', function(req, res) {
        PlayDate.find({}, function(err, docs) {
            if (err) {
                console.log(err)
                return res.json({ok: false}, 500)
            }

            return res.json(docs)
        })
    })

}
