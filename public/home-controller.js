myApp.controller('HomeCtrl', [
  '$scope',
  '$resource',
  function ($scope, $resource) {
    var socket = io();
    $scope.toggleValue = false;
    socket.on('start', function () {
      $scope.toggleValue = true;
      $scope.firstTime = false;
      $scope.$apply();
      startInterval();
      console.log('started!')
    });

    socket.on('stop', function () {
      $scope.toggleValue = false;
      $scope.$apply();
      console.log('stopped!')
    });

    detectedAlready = false;
    $scope.firstTime = true;
    let interval
    startInterval = function () {
      if ($scope.toggleValue) {
        $scope.firstTime = false;
        Webcam.attach('#my_camera');
        if (!interval) {
          interval = setInterval(function () {
            Webcam
              .snap(function (data_uri) {
                azurePredictionAPI(data_uri, console.log);
                awsAPI(data_uri, function (res) {
                    if (detectedAlready) 
                      return;
                    if (res == 'An intruder is in the home') {
                      console.log('an intruder is in the home!');

                      getCurrentLocation(function (res,lat,lng) {
                        console.log(`CALLING POLICE: ${res}, (${lat}, ${lng})`)}
                      );
                      detectedAlready = true;
                      sendText('516-404-8254', data_uri);
                    }
                  }
                );
              })
          }, 3000);
        }
      } else {
        if (!$scope.firstTime) 
          Webcam.reset();
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

const makeblob = function (dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], {type: contentType});
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
}

const azurePredictionAPI = function (data_uri, cb) {
  $.ajax({
    url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/' +
        '1e8b8aee-9349-4b61-b01e-525de7f8b4d8/image?iterationId=8cc6bde7-21c7-4cda-bdf3-2' +
        '1c12533edf7',
    type: 'POST',
    contentType: 'application/octet-stream',
    processData: false,
    headers: {
      'Prediction-Key': 'faca39e5852f43a296bbb20466c0bbf4'
    },
    'data': makeblob(data_uri),
    'success': function (res) {
      cb(res.Predictions);
    }
  })
}

const awsAPI = function (data_uri, cb) {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  $.ajax({
    'url': proxyurl + 'https://ekpqr3k4xi.execute-api.us-east-1.amazonaws.com/prod/myresource',
    'type': 'PUT',
    'contentType': "application/json",
    'data': JSON.stringify({data: data_uri}),
    'success' : cb
  });

}

const getCurrentLocation = function(cb) {
  navigator
  .geolocation
  .getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      $.ajax({
        'url' : '/getaddress',
        'type' : 'POST',
        'contentType': "application/json",
        'data' : JSON.stringify({lat:lat,lng:lng}),
        'success' : function (res) {
          cb(res,lat,lng);
        }
      })
    }, function (error) {
  });
}

const sendText = function(number, data) {
  $.ajax({
    'url': '/text',
    'type': 'POST',
    'contentType': "application/json",
    'data': {number:number, image: data}
  });
}