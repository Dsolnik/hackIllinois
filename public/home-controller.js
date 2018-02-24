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
                // $.ajax({
                //   url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/1e8b8aee-9349-4b61-b01e-525de7f8b4d8/image?iterationId=67026839-5d34-4cdf-b12c-4eae033b0cf2',
                //   type: 'POST',
                //   contentType: 'application/octet-stream',
                //   processData: false,
                //   headers: {
                //     'Prediction-Key': 'faca39e5852f43a296bbb20466c0bbf4'
                //   },
                //   'data': makeblob(data_uri),
                //   'success': function (res) {
                //     console.log(res.Predictions);
                //   }
                // })
                $.ajax({
                  'url': proxyurl + 'https://ekpqr3k4xi.execute-api.us-east-1.amazonaws.com/prod/myresource',
                  'type': 'PUT',
                  'contentType': "application/json",
                  'data': JSON.stringify({data: data_uri}),
                  'success': function (res) {
                    if (res == 'An intruder is in the home') {
                      $.ajax({
                        'url': '/text',
                        'type': 'POST',
                        'contentType': "application/json",
                        'data': JSON.stringify({number: '516-404-8254', image: data_uri})
                      });
                    }
                  }
                });
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
