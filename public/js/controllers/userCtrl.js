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

    $scope.uploadPhoto = function (userId, files) {
        return fileUploadService.uploadUserPhoto(userId, files)
    }

    $scope.deleteUser = function (user) {
        return apiService.deleteUser(user)
    }

    apiService.getUsers().then(function(users) {$scope.users = users})

}