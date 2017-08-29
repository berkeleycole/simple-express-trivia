// require express
var express = require('express');
// sets app as express function
var app = express();

// takes in a url, sets up a response to be sent
app.get('/', function (request, response) {
 response.send('Hello World!');
});

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
