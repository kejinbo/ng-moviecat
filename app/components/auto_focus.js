/**
 *
 * Created by Administrator on 2018/8/9 0009.
 */
;(function (angular) {

	angular.module('AutoFocus', [])
		.directive('autoFocus', ['$location',function ($location) {
			var path = $location.path();
			return {
				restrict: 'A',
				link: function ($scope, iElm, iAttrs, controller) {
					var aLink = iElm.children().attr('href');
					var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
					if(path.startsWith(type)){//判断path字符串是否以type这个字符串开头
						iElm.addClass('active');
					}
					iElm.on('click', function (e) {
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					})
				}
			}
		}]);
})(angular);
