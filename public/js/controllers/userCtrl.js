var userCtrl = function ($scope, apiService, fileUploadService, $q) {
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

    $scope.makeFriends = function(user, friend) {
        var friendId = [friend._id]
        return apiService.addFriends(user, friendId)
    }

    $scope.areNotFriends = function(user, friend) {
        return !contains(user.friends, friend._id) || !contains(friend.friends, user._id)
    }

    apiService.getUsers().then(function(users) {$scope.users = users})

    function contains(array, item) {
        return array.indexOf(item) >= 0
    }

}