var app = angular.module('MyApp', []);
app.controller('MyCtrl', function($scope, $http) {
	$scope.orders = [];
	$scope.search = '';

    $http.post("http://dusannesicdevelopment.sytes.net:8181/getadminlist")
    .then(function (response) {
    	console.log(response.data);
    	$scope.orders = response.data;

    	for (var i = 0; i < $scope.orders.length; i++) {
    		if ($scope.orders[i].orderStatus) {
    			$scope.orders[i].orderStatus = 'Ditangguhkan'
    		} else {
    			$scope.orders[i].orderStatus = '';
    		}

    		console.log($scope.orders[i]);
    	}
    });
});