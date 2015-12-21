var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

console.log(name + ' has joined ' + room);

$('#room-name').text(room).rep;

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = $('.messages');
	var $message = $('<li class="list-group-item"></li>');


	console.log('New Message: ' + message.text);

	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mma') + '</strong></p>')
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
});

// Handle form submitting

var $form = $('#message-form');

$form.on('submit', function(e) {
	e.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
    }
    
    return undefined;
}