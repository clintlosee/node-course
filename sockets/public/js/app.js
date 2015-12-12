var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
	console.log('New Message: ' + message.text);

	$('.messages').append('<p>' + message.text + '</p>');
});

// Handle form submitting

var $form = $('#message-form');

$form.on('submit', function(e) {
	e.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});