'use strict';
var myApp = angular.module('different', [ 'ui.router','ngResource','ui.bootstrap','ui.toggle'])

.config(function($stateProvider, $locationProvider) {
	$stateProvider.state({
		name : 'home',
		url : '/',
		templateUrl : 'home.html',
		controller : 'HomeCtrl'
	});
	$locationProvider.html5Mode({
        enabled: true,
    });
})


.config(['$resourceProvider', function($resourceProvider) {
	  // Don't strip trailing slashes from calculated URLs
	  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
