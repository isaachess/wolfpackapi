var userControl = function ($scope, apiService) {

    $scope.stuff = "more stuff"
    $scope.database;
    $scope.users;

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

    apiService.getDatabase().then(function(db) {$scope.database = db})

    apiService.getUsers().then(function(users) {$scope.users = users})



}
