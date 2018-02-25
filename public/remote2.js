$(document).ready(function() {
  const socket = io();
  
  $('#start').on('click', function(){
    socket.emit('start');
  });

  $('#stop').on('click', function(){
    socket.emit('stop');
  });
  
});