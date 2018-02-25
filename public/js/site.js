var socket = io();

socket.on('connect', function () {
  console.log("chill");
});

socket.on('start', function() {
  $('#start').trigger('click');
})

socket.on('stop', function() {
  $('#stop').trigger('click');
})