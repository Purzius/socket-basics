var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); // use node instead of express listener // http server via nodeJS
var io = require('socket.io')(http);


// express static to expose a folder
app.use(express.static(__dirname + '/public'));

// io listen to event
io.on('connection', function() {
	console.log('User connected via socket.io!');
});

// start server
http.listen(PORT, function() {
	console.log('listening on *:' + PORT);
});