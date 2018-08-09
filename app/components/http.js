/**
 * Created by Administrator on 2018/8/9 0009.
 */
(function (angular) {
	var http = angular.module('myApp.services',[]);
	http.service('HttpService',['$window','$document', function ($window, $document) {
		this.jsonp = function (url, obj, callback) {

			var objString = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in obj) {
				objString += key + "=" + obj[key] + "&";
			}
			var Mjsonp = Math.random().toString().replace('.', '');
			var cbFuncName = 'my_jsonp_' + Mjsonp;
			$window[cbFuncName] = callback;

			objString += 'callback' + "=" + cbFuncName + '&';

			var Cscript = $document[0].createElement('script');
			Cscript.src = url + objString;
			$document[0].body.appendChild(Cscript);
		}
	}]);
	//var jsonp = function (url, obj, callback) {
    //
	//	var objString = url.indexOf('?') == -1 ? '?' : '&';
	//	for (var key in obj) {
	//		objString += key + "=" + obj[key] + "&";
	//	}
	//	var Mjsonp = Math.random().toString().replace('.', '');
	//	var cbFuncName = 'my_jsonp_' + Mjsonp;
	//	window[cbFuncName] = callback;
    //
	//	objString += 'callback' + "=" + cbFuncName + '&';
    //
	//	var Cscript = document.createElement('script');
	//	Cscript.src = url + objString;
	//	document.body.appendChild(Cscript);
	//};
	//window.$jsonp = jsonp;
})(angular);
