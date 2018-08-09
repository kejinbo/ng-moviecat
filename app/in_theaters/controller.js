'use strict';
(function (angular) {
	var angular = angular.module('myApp.in_theaters', ['ngRoute']);

	angular.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/in_theaters/:mPage', {
			templateUrl: 'in_theaters/view1.html',
			controller: 'InTheatersController'
		});
	}]);

	angular.controller('InTheatersController', ['$scope', '$route', '$routeParams', 'HttpService',function ($scope,$route,$routeParams,HttpService) {
		var page = parseInt($routeParams.mPage);
		var count = 10;
		var start = (page-1)*count;

		$scope.datas = [];
		$scope.loading = true;
		$scope.totalCount = 0;
		$scope.totalPages = 0;
		$scope.currentPage = page;
		$scope.title = '';
		HttpService.jsonp('https://api.douban.com/v2/movie/in_theaters',{start:start,count:count}, function (data) {
			$scope.datas = data.subjects;
			$scope.title = data.title;
			$scope.totalCount = data.total;
			$scope.totalPages = Math.ceil($scope.totalCount / count);
			$scope.loading = false;
			$scope.$apply();
		});
		$scope.go = function (Page) {
			if (Page >= 1 && Page <= $scope.totalPages) {
				$route.updateParams({mPage: Page})
			}
		}
	}]);
})(angular);
