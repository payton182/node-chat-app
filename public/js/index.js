var socket = io();

socket.on('connect', function() {
  console.log('You are now connected to the server.')
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);

  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#history').append(li);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'hi'
}, function(data) {
  console.log('Got it');
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name=message]').val()
  }, function() {


  });
});
