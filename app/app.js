'use strict';

// Declare app level module which depends on views, and components
(function (angular) {
	var angular = angular.module('myApp', [
		'ngRoute',
		'myApp.movie_lists',
		'myApp.services',
		'AutoFocus',
	]);
	angular.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}]);
})(angular);

