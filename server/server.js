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
    from: 'Payton',
    text: 'Message emit test server'
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

//If connection is closed
  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  })
});

//App init
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
