var socket = io();
socket.on('connect', function () {
	console.log('Client connected to server :D');
});