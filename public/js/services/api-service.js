var apiService = function ($http) {
    //Because who needs more than one?

    var userEndpoint = '/users' 
    var childEndpoint = '/children'
    var playdateEndpoint = '/playdates'
    var invitationEndpoint = '/invitations'

    this.getDatabase = function () {
        return getData($http.get('/'))
    }

    //USERS
    this.getUsers = function () {
        return getData($http.get(userEndpoint))
    }
    this.addUser = function (user) {
        return $http.post(userEndpoint, user)
    }
    this.updateUser = function(user) {
        return $http.post(userEndpoint + "/" + user._id, user)
    }

    this.deleteUser = function (user) {
        return $http.delete(userEndpoint + '/' + user._id)
    }


    //CHILDREN
    this.getChildren = function () {
        return getData($http.get(childEndpoint))
    }
    this.addChild = function (child) {
        return $http.post(childEndpoint, child)
    }
    this.updateChild = function (child) {
        return $http.post(childEndpoint + "/" + child._id, child)
    }

    this.deleteChild = function (child) {
        return $http.delete(childEndpoint + '/' + child._id)
    }


    //PLAYDATES
    this.getPlaydates = function () {
        return getData($http.get(playdateEndpoint))
    }
    this.addPlaydate = function (playdate) {
        return $http.post(playdateEndpoint, playdate)
    }
    this.updateChild = function (playdate) {
        return $http.post(playdateEndpoint + "/" + playdate._id, playdate)
    }

    this.deletePlaydate = function (playdate) {
        return $http.delete(playdateEndpoint + '/' + playdate._id)
    }


    //INVITATIONS
    this.getInvitations = function () {
        return getData($http.get(invitationEndpoint))
    }
    this.addInvitation = function (invitation) {
        return $http.post(invitationEndpoint, invitation)
    }
    this.updateInvitation = function (invitation) {
        return $http.post(invitationEndpoint + "/" + invitation._id, invitation)
    }
    this.deleteInivitation = function (invitation) {
        return $http.delete(invitationEndpoint + '/' + invitation._id)
    }

}


function getData(promise) {
    return promise.then(function(rs){
        return rs.data
    })
}