// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// $(document)
//   .ready(function () {
//     console.log('good!');
//     Webcam.attach('#my_camera');
//     let interval

//     startInterval = function startInterval() {
//       if (!interval) {
//         interval = setInterval(function () {
//           Webcam
//             .snap(function (data_uri) {
//               console.log(data_uri);
//             })
//         }, 3000);
//       }
//     }

//     stopInterval = function stopInterval() {
//       if (interval) {
//         clearInterval(interval);
//         interval = null
//       }
//     }

//     let start = jQuery('#start');
//     let stop = jQuery('#stop');
//     start.click(startInterval)
//     stop.click(stopInterval)
//   });