myApp.controller('HomeCtrl', [
  '$scope',
  '$resource',
  function ($scope, $resource) {
    $(document)
      .ready(function () {
        let interval
        startInterval = function startInterval() {
          Webcam.attach('#my_camera');
          if ($scope.toggleValue) {
            if (!interval) {
              interval = setInterval(function () {
                Webcam
                  .snap(function (data_uri) {
                    console.log(data_uri);
                  })
              }, 3000);
            }
          } else {
            Webcam.reset();
            if (interval) {
              clearInterval(interval);
              interval = null
            }
          }
        }
        let start = jQuery('#start');
        start.click(startInterval)
        stop.click(startInterval)
      });
    var me = this;

  }
]);
