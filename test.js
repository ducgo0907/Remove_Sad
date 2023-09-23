const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

// Keep track of connected users
const connectedUsers = {};

app.use('/', (req, res) => {
  return res.status(200).json('Hello 12');
});

socketIo.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  // Store the user's socket ID when they connect
  socket.on('storeUserId', (userId) => {
    connectedUsers[userId] = socket.id;
  });

  // Send the list of connected users to the client
  socket.on('getConnectedUsers', () => {
    socket.emit('connectedUsers', Object.keys(connectedUsers));
  });

  // Handle private messages between two users
  socket.on('privateMessage', ({ sender, receiver, message }) => {
    const receiverSocketId = connectedUsers[receiver];
    if (receiverSocketId) {
      // Send the message to the receiver only
      socketIo.to(receiverSocketId).emit('privateMessage', { sender, message });
    } else {
      // Handle the case where the receiver is not online
      socket.emit('receiverOffline', receiver);
    }
  });

  socket.on('disconnect', () => {
    // Remove the user's socket ID when they disconnect
    const userId = Object.keys(connectedUsers).find(
      (key) => connectedUsers[key] === socket.id
    );
    if (userId) {
      delete connectedUsers[userId];
      console.log('User disconnected:', userId);
    }
  });
});

server.listen(3000, () => {
  console.log(`Server is running on port: 3000`);
});
