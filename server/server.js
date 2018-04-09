const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (message) => {
    console.log('Message to be created: ', message)
  });

  socket.emit('newMessage', {
    from: 'david',
    text: 'Hello from david',
    createAt: 123
  });

  socket.on('disconnect', () => {
    console.log('User was disconnectd');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
