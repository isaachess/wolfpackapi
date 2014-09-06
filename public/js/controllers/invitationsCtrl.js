var invitationsCtrl = function($scope, apiService) {
    
    // INVITATIONS
    $scope.addInvitation = function (childId, playdateId, confirmed) {
        var invitation = {
            childId: childId,
            playDateId: playdateId,
            confirmed: confirmed,
        }
        return apiService.addInvitation(invitation)

    }
    $scope.updateInvitation = function (invitation) {
        return apiService.updateInvitation(invitation)
    }

    $scope.deleteInvitation = function (invitation) {
        return apiService.deleteInvitation(invitation)
    }

    // FILTERS 
    $scope.notDeleted = function (object) {
        return !object.deleted
    }

    apiService.getUsers().then(function(users) {$scope.users = users})
    apiService.getInvitations().then(function(invitations) {$scope.invitations = invitations})
    apiService.getChildren().then(function(children) {$scope.children = children})
    apiService.getPlaydates().then(function(playdates) {$scope.playdates = playdates})


}