var childrenCtrl = function($scope, apiService, fileUploadService) {

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

    $scope.uploadPhoto = function (childId, files) {
        return fileUploadService.uploadChildPhoto(childId, files)
    }

    apiService.getChildren().then(function(children) {$scope.children = children})
    apiService.getUsers().then(function(users) {$scope.users = users})

}