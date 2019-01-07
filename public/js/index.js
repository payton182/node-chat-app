var socket = io();

socket.on('connect', function() {
  console.log('You are now connected to the server.');

  socket.emit('createMessage', {
    from: 'Payton',
    text: 'Message working'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
