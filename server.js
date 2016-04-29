var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

// use node instead of express listener
// http server via nodeJS
var http = require('http').Server(app);

// express static to expose a folder
app.use(express.static(__dirname + '/public'));

// start server
http.listen(PORT, function() {
	console.log('Server listening on port: ' + PORT);
});