
myAppRemote.controller('RemoteCtrl', [
    '$scope',
    '$resource',
    function ($scope, $resource) {
        console.log("Remote Page");   
        
        $scope.start = function(){
            var User = $resource('/api/start surveillance');
			 	var user = User.get(function() {
					
				}); 
        };

        $scope.stop = function(){
            
        };

    }
]);
  