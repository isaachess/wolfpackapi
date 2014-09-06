var app = angular.module("admin", ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true)

    $urlRouterProvider.otherwise("/admin/state1")

    $stateProvider
        .state('state1', {url:'/admin/state1', templateUrl: '/admin/templates/state1.html'})
        .state('users', {url:'/admin/users', templateUrl:'/admin/templates/users.html', controller:userCtrl})
        .state('oldStuff', {url:'/admin/oldStuff', templateUrl: '/admin/templates/oldStuff.html', controller:oldStuffCtrl})
})

app.service("apiService", apiService)
