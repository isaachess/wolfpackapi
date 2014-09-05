var apiService = function ($http) {
    //Because who needs more than one?

    var userEndpoint = '/users' 
    var childEndpoint = '/children'
    var playdateEndpoint = '/playdates'
    var invitationEndpoint = '/invitations'

    this.getDatabase = function () {
        return getData($http.get('/'))
    }

    this.getUsers = function () {
        return getData($http.get(userEndpoint))
    }
    this.getChildren = function () {
        return getData($http.get(childEndpoint))
    }
    this.getPlaydates = function () {
        return getData($http.get(playdateEndpoint))
    }
    this.getInvitations = function () {
        return getData($http.get(invitationEndpoint))
    }

}


function getData(promise) {
    return promise.then(function(rs){
        return rs.data
    })
}