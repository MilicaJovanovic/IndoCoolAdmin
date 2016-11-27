var app = angular.module('MyApp', []);
app.controller('MyCtrl', function($scope, $http) {
    $http.get("http://www.w3schools.com/angular/customers.php")
    .then(function (response) {
    	$scope.names = response.data.records;
    });
});