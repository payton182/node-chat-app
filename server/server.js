const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('A new user has connected.');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined.'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('Server message text');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

//if connection is closed
  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  })
});

//App init
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
