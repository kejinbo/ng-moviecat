'use strict';
(function (angular) {
	var angular = angular.module('myApp.coming_soon', ['ngRoute']);

	angular.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/coming_soon/:mPage', {
			templateUrl: 'coming_soon/view1.html',
			controller: 'ComingSoonController'
		});
	}]);

	angular.controller('ComingSoonController', ['$scope', '$route', '$routeParams', 'HttpService', function ($scope, $route, $routeParams, HttpService) {
		var page = parseInt($routeParams.mPage);
		var count = 10;
		var start = (page - 1) * count;

		$scope.datas = [];
		$scope.title = '';
		$scope.currentPage = page;
		$scope.totalPages = 0;
		$scope.totalCount = 0;
		$scope.loading = true;
		HttpService.jsonp('https://api.douban.com/v2/movie/coming_soon', {start: start, count: count}, function (data) {
			//console.log(data);

			$scope.datas = data.subjects;
			$scope.title = data.title;
			$scope.totalCount = data.total;
			$scope.totalPages = Math.ceil($scope.totalCount / count);
			$scope.loading = false;
			$scope.$apply();
		});
		$scope.go = function (page) {
			if (page >= 1 && page <= $scope.totalPages) {
				$route.updateParams({mPage: page});
			}
		}
	}]);
})(angular);
