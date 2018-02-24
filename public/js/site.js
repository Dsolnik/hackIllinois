const proxyurl = "https://cors-anywhere.herokuapp.com/";
const rapid = new RapidAPI('coolproject', '71b145f659df4c68b9ae7e307fc96a77');
$(document)
  .ready(function () {
    Webcam.attach('#my_camera');
    let interval

    startInterval = function startInterval() {
      if (!interval) {
        interval = setInterval(function () {
          Webcam
            .snap(function (data_uri) {
              console.log(data_uri);
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
    }

    stopInterval = function stopInterval() {
      if (interval) {
        clearInterval(interval);
        interval = null
      }
    }

    let start = $('#start');
    let stop = $('#stop');
    start.click(startInterval)
    stop.click(stopInterval)
  });