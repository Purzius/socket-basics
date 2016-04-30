var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app); // use node instead of express listener // http server via nodeJS
var io = require('socket.io')(http);


// express static to expose a folder
app.use(express.static(__dirname + '/public'));

var clientInfo = {};

// io listen to event
io.on('connection', function(socket) {
	console.log('User connected via socket.io!');

	socket.on('disconnect', function () {
		var userData = clientInfo[socket.id];
		if (typeof userData.room !== 'undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left!',
				timestamp: moment().valueOf()
			});
			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function(req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		})
	});

	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);

		// io.emit == send to all incl. sender
		// socket.broadcast.emit == send to all but sender
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message);
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