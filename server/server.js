const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('A new user has connected.');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app.'
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined.',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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
