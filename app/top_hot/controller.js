'use strict';
(function (angular) {
	var angular = angular.module('myApp.movie_lists', ['ngRoute']);

	angular.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/top_hot/:mPage', {
			templateUrl: 'top_hot/view1.html',
			controller: 'TopHotController'
		});
	}]);
	//控制器 分两步：1.设计暴露数据，2.设置暴露的行为
	angular.controller('TopHotController', ['$scope', '$route', '$routeParams', 'HttpService', function ($scope, $route, $routeParams, HttpService) {
		var page = parseInt($routeParams.mPage);
		var count = 10;
		var start = (page - 1) * count;

		$scope.datas = [];
		$scope.loading = true;
		$scope.totalCount = 0;
		$scope.totalPages = 0;
		$scope.currentPage = page;
		$scope.title = "";
		HttpService.jsonp('https://api.douban.com/v2/movie/top250', {start: start, count: count}, function (data) {
			$scope.title = data.title;
			$scope.datas = data.subjects;
			$scope.totalCount = data.total;
			$scope.totalPages = Math.ceil($scope.totalCount / count);
			$scope.loading = false;
			$scope.$apply();
		});
		$scope.go = function (Page) {
			if (Page >= 1 && Page <= $scope.totalPages) {
				$route.updateParams({mPage: Page})
			}
		};

		//测试$http服务
		//$http({
		//	method: 'get',
		//	url: '../app/data.json'
		//}).then(function (res) {
		//	if (res.status == 200) {
		//		$scope.datas = res.data.subjects;
		//	} else {
		//		console.log('error');
		//	}
		//}, function (err) {
		//	console.log('error='+err);
		//});
	}]);
})(angular);
