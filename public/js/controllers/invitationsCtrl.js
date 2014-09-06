var invitationsCtrl = function($scope, apiService) {
    
    // INVITATIONS
    $scope.addInvitation = function (childId, playdateId, confirmed) {
        var invitation = {
            childId: childId,
            playdateId: playdateId,
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


    apiService.getInvitations().then(function(invitations) {$scope.invitations = invitations})

}