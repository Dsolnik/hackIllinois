myApp.controller('HomeCtrl', [
  '$scope',
  '$resource',
  'Flash',
  function ($scope, $resource, Flash) {
    getNavigationAuth();

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
      startInterval();
      console.log('stopped!')
    });

    var message = 'Your surveillance device is connected and running.';
    var notificationMsg = 'Your phone is ready to recieve alert message.';
    var alertPoliceMsg = 'Police is alerted';

    $scope.alertPolice = function () {
      getCurrentLocation(function (res, lat, lng) {
        sendTextPlain('5164048254', `There is an intruder at ${res}, (${lat}, ${lng})`)
      });
    }

    $scope.pushNotification = function () {
      if ($scope.toggleValue_) {
        Flash.create('success', notificationMsg, 0, {
          class: 'custom-class',
          id: 'custom-id'
        }, true);
      }

    }

    $scope.changed = function () {
      if ($scope.toggleValue) {
        Flash.create('success', message, 0, {
          class: 'custom-class',
          id: 'custom-id'
        }, true);
      }
    }

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

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
                awsAPI(data_uri, function (res) {
                  if (detectedAlready) 
                    return;
                  if (res == 'An intruder is in the home') {
                    console.log('an intruder is in the home!');
                    azurePredictionAPI(data_uri, function (predictions) {
                      const no_gun = findTag(predictions, "Intruder not carrying a gun");
                      const gun = findTag(predictions, "Intruder carrying a gun");
                      const dangerous = findTag(predictions, "The man is dangerous");
                      if (gun && gun.Probability > .95) {
                        setTimeout(function(){
                          sendTextPlain('5164048254', "The man has a gun!");                          
                        },2000);
                        // console.log('sent gun');
                      } else {
                        setTimeout(function(){
                          sendTextPlain('5164048254', "The man has a gun!");                          
                        },2000);
                        // console.log('sent no gun');
                      }
                    });
                    getCurrentLocation(function (res, lat, lng) {
                      sendTextPlain('5164048254', `There is an intruder at ${res}, (${lat}, ${lng})`)
                    });
                    detectedAlready = true;
                    sendText('5164048254', data_uri, 'There is an Intruder!');
                  }
                });
              })
          }, 2000);
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
    'success': cb
  });

}

const getCurrentLocation = function (cb) {
  navigator
    .geolocation
    .getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      $.ajax({
        'url': '/getaddress',
        'type': 'POST',
        'contentType': "application/json",
        'data': JSON.stringify({lat: lat, lng: lng}),
        'success': function (res) {
          cb(res, lat, lng);
        }
      });
    }, function (failure) {
      $
        .getJSON('https://ipinfo.io/geo', function (response) {
          const loc = response
            .loc
            .split(',');
          const lat = loc[0];
          const lng = loc[1];
          $.ajax({
            'url': '/getaddress',
            'type': 'POST',
            'contentType': "application/json",
            'data': JSON.stringify({lat: lat, lng: lng}),
            'success': function (res) {
              cb(res, lat, lng);
            }
          });
        });
    });
}

const sendTextPlain = function (number, text) {
  $.ajax({
    'url': '/text',
    'type': 'POST',
    'contentType': "application/json",
    'data': JSON.stringify({number: number, text: text})
  });
}

const sendText = function (number, data, text) {
  $.ajax({
    'url': '/text',
    'type': 'POST',
    'contentType': "application/json",
    'data': JSON.stringify({number: number, image: data, text: text})
  });
}

function getNavigationAuth() {
  navigator
    .geolocation
    .getCurrentPosition(function () {}, function () {});
}

function findTag(arr, tag) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].Tag == tag) 
      return arr[i];
    }
  }