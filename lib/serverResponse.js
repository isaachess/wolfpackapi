function serverError(res) {
    return function(err) {
        console.log(err)
        return res.json({ok: false}, 500)        
    }
}

module.exports.serverError = serverError