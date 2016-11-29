var app = angular.module('MyApp', []);
app.controller('MyCtrl', function($scope, $http) {
    $("#date").datepicker();
    $("#time").timepicker();

	$scope.orders = [];
	$scope.search = '';
	$scope.orderType = {
		value : ""
	}
    $scope.name = {
        value : ""
    }
    $scope.address = {
        value : ""
    }
    $scope.phone = {
        value : ""
    }
    $scope.unit = {
        value : ""
    }
    $scope.cond = {
        value : ""
    }
    $scope.date;
    $scope.time;

    $http.post("http://dusannesicdevelopment.sytes.net:8181/getadminlist")
    .then(function (response) {
    	$scope.orders = response.data;

    	for (var i = 0; i < $scope.orders.length; i++) {
    		if ($scope.orders[i].orderStatus) {
    			$scope.orders[i].orderStatus = 'Ditangguhkan'
    		} else {
    			$scope.orders[i].orderStatus = '';
    		}
    	}
    });

    $scope.submit = function() {
        
        var timeParams = $scope.time.value.split(":");
        var newTime = new Date();
        newTime.setHours(timeParams[0]);

        var minuteParams = timeParams[1].substring(0,2);
        newTime.setMinutes(minuteParams);

        var order = {
            orderReceiverName : $scope.name.value,
            orderAddress : $scope.address.value,
            orderPhoneNo : $scope.phone.value,
            orderForDate : new Date($scope.date.value),
            orderForHours : newTime,
            orderStatus : 1,
            orderType : $scope.orderType.value,
            cust_id : {
                id : 1
            }
        }
        var orderDetail = {
            orderUnitType : $scope.unit.value,
            orderUnitCondition : $scope.cond.value
        }
        var object = {
            order : order,
            orderDetail : orderDetail
        }

        $http.post('http://dusannesicdevelopment.sytes.net:8181/addorder', JSON.stringify(object))
        .success(function() {
            window.location.reload();
        })
        .error(function() {
            alert("There was an error with communication with the server. Please try again later.")
        });
    }
});