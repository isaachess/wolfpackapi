var userCtrl = function ($scope, apiService, fileUploadService) {
    // USERS
    $scope.addUser = function (phone, firstName, lastName) {
        var user = {
            phone: phone,
            firstName: firstName,
            lastName: lastName
        }
        return apiService.addUser(user)
    }
    $scope.updateUser = function (user, editMode) {
        editMode = false
        return apiService.updateUser(user)
    }

    $scope.uploadPhoto = function (files) {
        return fileUploadService.uploadUserPhoto($scope.users[0], files)
        .then(function(url) {console.log('url',url)})
    }

    apiService.getUsers().then(function(users) {$scope.users = users; console.log('users',users)})

}