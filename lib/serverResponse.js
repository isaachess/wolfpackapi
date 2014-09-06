function serverError(res) {
    return function(err) {
        console.log(err)
        return standardError(res)
    }
}

function standardError(res) {
    return res.json({ok: false}, 500)
}

module.exports.serverError = serverError
module.exports.standardError = standardError