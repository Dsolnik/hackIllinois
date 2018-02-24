
myApp.controller('HomeCtrl', [
  '$scope',
  '$resource',
  function ($scope, $resource) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    $scope.firstTime = true;
    let interval
    startInterval = function startInterval() {
      if ($scope.toggleValue) {
        $scope.firstTime = false;
        Webcam.attach('#my_camera');
        if (!interval) {
          interval = setInterval(function () {
            Webcam
              .snap(function (data_uri) {
                console.log(data_uri)
                $.ajax({
                  'url' : proxyurl + 'https://ekpqr3k4xi.execute-api.us-east-1.amazonaws.com/prod/myresource',
                  'type' : 'PUT',
                  'contentType' : "application/json",
                  'data' : JSON.stringify({data: data_uri}),
                //The response from the server
                  'success' : function(res) {
                    console.log(res);
                  }
                });
                })
          }, 3000);
        }
      } else {
        if (!$scope.firstTime) Webcam.reset();
        if (interval) {
          clearInterval(interval);
          interval = null
        }
      }
    }
    let start = jQuery('#start');
    start.click(startInterval)
    
    var me = this;
  }
]);
