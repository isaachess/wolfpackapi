var fileUploadService = function($http) {

    var userEndpoint = '/users' 
    var childEndpoint = '/children'
    var playdateEndpoint = '/playdates'
    var invitationEndpoint = '/invitations'

    var options = {
        withCredentials: true,
        headers: {'Content-Type':undefined},
        transformRequest: angular.identity
    }

    this.uploadUserPhoto = function (user, files) {
        var fd = new FormData()
        fd.append("image", files[0])
        return $http.post(userEndpoint+'/'+user._id+'/image', fd, options)
        .then(function(rs) {return rs.data})
    }

}