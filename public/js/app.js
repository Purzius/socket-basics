var socket = io();

socket.on('connect', function () {
	console.log('Client connected to server :D');
});

socket.on('message', function (message) {
	console.log('New message: ' + message.text);
});