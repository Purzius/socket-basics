var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Space';

var $form = $('#message-form');
var $message = $('#message');
var $messages = $('#messages');
var $room = $('#room-title');

console.log(name + ' wants to join ' + room);

// socket on connect
	socket.on('connect', function () {
		console.log('Client connected to server :D');
		socket.emit('joinRoom', {
			name: name,
			room: room
		});
	});

// socket message received
	socket.on('message', function (message) {
		console.log('New message: ' + message.text);
		var momentTimestamp = moment.utc(message.timestamp);
		var momentTimestampFormat = momentTimestamp.local().format('h:mm a');
		var $messageOutput = $('<li class="list-group-item"></li>');

		$messageOutput.append('<p><strong>' + message.name + ' ' + momentTimestampFormat + '</strong></p>');
		$messageOutput.append('<p>' + message.text +'</p>');
		$messages.append($messageOutput);
	});

// handle submit of message
	$form.on('submit', function (e) {
		e.preventDefault();

	// send message to server
		socket.emit('message', {
			name: name,
			text: $message.val()
		});

	// clear field
		$message.val('');

	});

// set room name
	$room.text(room);