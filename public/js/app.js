var app = angular.module("admin", ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true)

    $urlRouterProvider.otherwise("/admin/state1")

    $stateProvider
        .state('users', {url:'/admin/users', templateUrl:'/admin/templates/users.html', controller:userCtrl})
        .state('oldStuff', {url:'/admin/oldstuff', templateUrl: '/admin/templates/oldStuff.html', controller:oldStuffCtrl})
        .state('playDates', {url:'/admin/playdates', templateUrl: '/admin/templates/playDates.html', controller:playDatesCtrl})
        .state('invitations', {url:'/admin/invitations', templateUrl: '/admin/templates/invitations.html', controller:invitationsCtrl})
        .state('children', {url:'/admin/children', templateUrl: '/admin/templates/children.html', controller:childrenCtrl})
})

app.service("apiService", apiService)
app.service("fileUploadService", fileUploadService)

// Directives
app.directive('fileUpload', fileUploadDirective)

// Filters
app.filter('userName', function() {
    return function(id, users) {
        var ids = users.map(function(user) {
            return user._id
        })
        var index = ids.indexOf(id)
        var user = users[index]
        return user.firstName + user.lastName
    }
})