/*
  app.js
  mohan chinnappan
    
  Ref: https://github.com/ccoenraets/salesforce-canvas-demo

  */
var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  // CryptoJS = require("crypto-js"),
  decode = require('salesforce-signed-request')
;
var app = express();
// make sure to set by:
//  heroku config:set CANVAS_CONSUMER_SECRET=adsfadsfdsfsdafsdfsdf

var consumerSecret = process.env.CANVAS_CONSUMER_SECRET;
 
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: true }));
// just a welcome page
app.get('/', function (req, res) {
  res.render('welcome');
});

// SF call POST us on this URI with signed request
app.post('/signedrequest', function (req, res) {

  var signedRequest = decode(req.body.signed_request, consumerSecret),
        context = signedRequest.context,
        oauthToken = signedRequest.client.oauthToken,
        instanceUrl = signedRequest.client.instanceUrl
        ;

  var payload = {
    instanceUrl: instanceUrl, 
    headers: {
        'Authorization': 'OAuth ' + oauthToken
    },
    context: context 
   };
   res.render('index', { payload: payload });

  });

var port = process.env.PORT || 9000;
app.listen(port);
console.log('Listening on port ' + port);
