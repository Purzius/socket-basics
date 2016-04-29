var socket = io();

socket.on('connect', function () {
	console.log('Client connected to server :D');
});

socket.on('message', function (message) {
	console.log('New message: ' + message.text);
});


// handle submit of message
	var $form = $('#message-form');
	var $message = $('#message');

	$form.on('submit', function (e) {
		e.preventDefault();

	// send message to server
		socket.emit('message', {
			text: $message.val()
		});

	// clear field
		$message.val('');

	});