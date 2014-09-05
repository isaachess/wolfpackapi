var userControl = function ($scope, apiService) {

    $scope.stuff = "more stuff"
    $scope.page = "users"
    $scope.database;
    $scope.users;
    $scope.children;


    //USERS
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

    $scope.notDeleted = function (object) {
        return !object.deleted
    }

    //CHILDREN
    $scope.addChild = function (parentId, firstName, lastName) {
        var child = {
            parentId: parentId,
            firstName: firstName,
            lastName: lastName
        }
        return apiService.addChild(child)
    }

    apiService.getDatabase().then(function(db) {$scope.database = db})

    apiService.getUsers().then(function(users) {$scope.users = users})
    apiService.getChildren().then(function(children) {$scope.children = children})

}

