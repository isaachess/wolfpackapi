var userControl = function ($scope, apiService) {

    $scope.stuff = "more stuff"
    $scope.database;
    $scope.users;

    apiService.getDatabase().then(function(db) {$scope.database = db})

    apiService.getUsers().then(function(users) {$scope.users = users})



}
