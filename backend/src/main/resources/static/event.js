angular.module('event', [])
	.controller('EventController', function($scope, $http) {
		$http.get('/api/event?id=').
		then(function(response) {
			$scope.event = response.data;
		});
	});
