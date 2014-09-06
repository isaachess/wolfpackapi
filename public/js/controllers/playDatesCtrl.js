var playDatesCtrl = function($scope, apiService) {

    // PLAYDATES
    $scope.addPlaydate = function (date, ownerId, location) {
        var playdate = {
            date: date,
            ownerId: ownerId,
            location: location
        }
        return apiService.addPlaydate(playdate)

    }
    $scope.updatePlaydate = function (playdate) {
        return apiService.updatePlaydate(playdate)
    }

    apiService.getPlaydates().then(function(playdates) {$scope.playdates = playdates})

}
