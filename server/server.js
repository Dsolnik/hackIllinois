// listen (start app with node server.js) ======================================

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(express.static(publicPath));

app.route('/').get((req, res) => {
  res.render('index');
}).post((req, res) => {
  console.log(Object.keys(req), req);
  res.send(req);
})

app.route('/check').post((req, res) => {
  
})

// default error page
app.use((req, res) => {
  res.status(404).render('error', {
      errorTitle: 'Not Found',
      errorMsg: 'Sorry, we couldn\'t find that'});
})

server.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`)
});