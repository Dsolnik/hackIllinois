var socket = io();

socket.on('start', function() {
  $('#start').trigger('click');
})

socket.on('stop', function() {
  $('#stop').trigger('click');
})