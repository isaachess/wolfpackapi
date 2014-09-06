var userControl = function ($scope, apiService) {

    $scope.stuff = "more stuff"
    $scope.page = "users"
    $scope.users;
    $scope.children;
    $scope.playdates;
    $scope.invitations;


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

    // CHILDREN
    $scope.addChild = function (parentId, firstName, lastName) {
        var child = {
            parentId: parentId,
            firstName: firstName,
            lastName: lastName
        }
        return apiService.addChild(child)
    }

    $scope.updateChild = function (child) {
        return apiService.updateChild(child)
    }

    // PLAYDATES


    // INVITATIONS


    // FILTERS 
    $scope.notDeleted = function (object) {
        return !object.deleted
    }


    apiService.getUsers().then(function(users) {$scope.users = users})
    apiService.getChildren().then(function(children) {$scope.children = children})
    apiService.getPlaydates().then(function(playdates) {$scope.playdates = playdates})
    apiService.getInvitations().then(function(invitations) {$scope.invitations = invitations})

}

