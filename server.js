var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app); // use node instead of express listener // http server via nodeJS
var io = require('socket.io')(http);


// express static to expose a folder
app.use(express.static(__dirname + '/public'));

// io listen to event
io.on('connection', function(socket) {
	console.log('User connected via socket.io!');

	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);

		// io.emit == send to all incl. sender
		// socket.broadcast.emit == send to all but sender
		message.timestamp = moment().valueOf();
		io.emit('message', message);
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application :D',
		timestamp: moment().valueOf()
	});
});

// start server
http.listen(PORT, function() {
	console.log('listening on *:' + PORT);
});