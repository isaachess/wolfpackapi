var userCtrl = function ($scope, apiService) {
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

    apiService.getUsers().then(function(users) {$scope.users = users})

}