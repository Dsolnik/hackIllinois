myAppRemote.controller('RemoteCtrl', [
  '$scope',
  '$resource',
  function ($scope, $resource) {
      console.log("Remote Page");   
      $(document).ready(function() {
        const socket = io();
        $scope.start = function(){
          console.log('start');
          socket.emit('start');
        };

        $scope.stop = function() {
          console.log('stop');
          socket.emit('stop');
        };
        
      });      
  }
]);