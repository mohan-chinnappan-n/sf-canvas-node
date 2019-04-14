// https://rajvakati.com/2017/10/19/salesforce-node-js-canvas-signed-request/
var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  CryptoJS = require("crypto-js");
var app = express();
var consumerSecret = process.env.CANVAS_CONSUMER_SECRET;
 
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: true }));
app.get('/', function (req, res) {
  res.render('welcome');
});

app.post('/signedrequest', function (req, res) {
  var signed_req = req.body.signed_request;
  var hashedContext = signed_req.split('.')[0];
  var context = signed_req.split('.')[1];
  var hash = CryptoJS.HmacSHA256(context, consumerSecret);
  var b64Hash = CryptoJS.enc.Base64.stringify(hash);
  if (hashedContext === b64Hash) {
    res.render('index', { req: req.body, res: res.data });
 } else {
    res.send("authentication failed");
  };
})

var port = process.env.PORT || 9000;
app.listen(port);
console.log('Listening on port ' + port);
