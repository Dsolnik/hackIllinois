'use strict';
var myApp = angular.module('different', [ 'ui.router','ngResource','ui.bootstrap','ui.toggle','ngFlash','angular-loading-bar'])

.config(function($stateProvider, $locationProvider) {
	$stateProvider.state({
		name : 'home',
		url : '/',
		templateUrl : 'home.html',
		controller : 'HomeCtrl'
	});

	$stateProvider.state({
		name : 'user',
		url : '/user',
		templateUrl : 'user.html',
		controller : 'UserCtrl'
	});
	$locationProvider.html5Mode({
        enabled: true,
	});
	
})

.config(['$resourceProvider', function($resourceProvider) {
	  // Don't strip trailing slashes from calculated URLs
	  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
