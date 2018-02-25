'use strict';
var myAppRemote = angular.module('remote', [ 'ui.router','ngResource','ui.bootstrap','ui.toggle'])
.config(function($stateProvider, $locationProvider) {
	$stateProvider.state({
		name : 'remote',
		url : '/remote',
		templateUrl : 'remote.html',
		controller : 'RemoteCtrl'
	});

	$locationProvider.html5Mode({
        enabled: true
    });
})
.config(['$resourceProvider', function($resourceProvider) {
	  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
