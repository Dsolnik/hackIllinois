myAppRemote.controller('RemoteCtrl', [
  '$scope',
  '$resource',
  function ($scope, $resource) {
      console.log("Remote Page");   
      $(document).ready(function() {
        const socket = io();
        
        $('#start').on('click', function(){
          socket.emit('start');
        });
      
        $('#stop').on('click', function(){
          socket.emit('stop');
        });
        
      });      
  }
]);