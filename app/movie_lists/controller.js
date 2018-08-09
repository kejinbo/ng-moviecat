'use strict';
(function (angular) {
	var angular = angular.module('myApp.movie_lists', ['ngRoute']);

	angular.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/:mvApiName/:mPage', {
			templateUrl: 'movie_lists/view1.html',
			controller: 'MvController'
		});
	}]);
	//控制器 分两步：1.设计暴露数据，2.设置暴露的行为
	angular.controller('MvController', ['$scope', '$route', '$routeParams', 'HttpService', function ($scope, $route, $routeParams, HttpService) {
		var page = parseInt($routeParams.mPage);
		var count = 10;
		var start = (page - 1) * count;
		var mvApiName = $routeParams.mvApiName;
		console.log(page);
		$scope.datas = [];
		$scope.loading = true;
		$scope.totalCount = 0;
		$scope.totalPages = 0;
		$scope.currentPage = page;
		$scope.title = "";
		HttpService.jsonp('https://api.douban.com/v2/movie/'+mvApiName, {start: start, count: count}, function (data) {
			$scope.title = data.title;
			$scope.datas = data.subjects;
			$scope.totalCount = data.total;
			$scope.totalPages = Math.ceil($scope.totalCount / count);
			$scope.loading = false;
			$scope.$apply();
		});
		$scope.go = function (mPage) {
			console.log(mPage);
			if (mPage >= 1 && mPage <= $scope.totalPages) {
				$route.updateParams({mPage: mPage})
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
