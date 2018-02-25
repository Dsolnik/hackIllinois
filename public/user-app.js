'use strict';
var myUserApp = angular.module('userApp', [ 'ui.router','ngResource','ui.bootstrap','ui.toggle'])

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
