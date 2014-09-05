var app = angular.module("admin", [])

app.service("apiService", apiService)

app.controller("userControl", userControl)

console.log("admin.js works")