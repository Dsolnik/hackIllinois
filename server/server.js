const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const axios = require('axios');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const accountSid = 'AC438f729a8ea068b01ec95f0670115e79';
const authToken = 'eef7b5ff954d9b23fca680a97f143426';
const client = require('twilio')(accountSid, authToken);

// Find your account sid and auth token in your Twilio account Console. const
// client = new twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

const app = express();
var server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(express.static(publicPath));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app
  .route('/')
  .get((req, res) => {
    res.render('index');
  })
  .post((req, res) => {
    console.log(Object.keys(req), req);
    res.send(req);
  })

app
  .route('/login')
  .get((req, res) => {
    res.render('login');
  })

app
  .route('/remote')
  .get((req, res) => {
    res.render('remote');
  })

  app
  .route('/user')
  .get((req, res) => {
    res.render('user');
  })


app.post('/getaddress', (req, res) => {
  const {lat, lng} = req.body;
  console.log(lat,lng);
  axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDaZcnk0G6r4q_KRs3AI9V_-_YCn9Np9l0`)
    .then((response) => {
      res.send(response.data.results[0].formatted_address);
    })
    .catch((e) => console.log('errror', e));

});

app
  .route('/redirect')
  .get((req, res) => {
    res.render('index');
  })

app.post('/text', async(req, res) => {
  const {image, number, text} = req.body;
  if (image) {
  const hashedName = image.hashCode();
  const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");

  await require("fs").writeFile(`./public/images/${hashedName}.jpeg`, base64Data, 'base64', function (err) {
    console.log(err);
  });
  console.log(req.headers.host + `/images/${hashedName}.jpeg`);

  client
    .messages
    .create({
      to: `+1${number}`,
      from: '+13475072312',
      body: text,
      mediaUrl: 'https://' + req.headers.host + `/images/${hashedName}.jpeg`
    })
    .then((message) => console.log('message succesfully sent!'))
    .catch((e) => console.log('error ', e));

  res.end('cool!');
  } else {
    client
    .messages
    .create({
      to: `+1${number}`,
      from: '+13475072312',
      body: text,
    })
    .then((message) => console.log('message succesfully sent!'))
    .catch((e) => console.log('error ', e));

  }
});

app
  .route('/check')
  .post((req, res) => {})

// default error page
app.use((req, res) => {
  res
    .status(404)
    .render('error', {
      errorTitle: 'Not Found',
      errorMsg: 'Sorry, we couldn\'t find that'
    });
})

server.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`)
});

String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) 
    return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

io.on('connection', (socket) => {

  socket
    .on('start', function () {
      socket
        .broadcast
        .emit('start');
    })

  socket.on('stop', function () {
    socket
      .broadcast
      .emit('stop');
  });
});
