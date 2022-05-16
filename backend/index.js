const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { userRoutes, chatRoutes, roomRoutes } = require('./routes');
const connectToDB = require('./db.config');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4200;

//create new io server with
// your http server
const io = new Server(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', chatRoutes);
app.use('/api', roomRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');

  //reciving chat message event
  socket.on('chat message', (msg) => {
    console.log('Messge: ' + msg);
    //sending to everyone including the writer;
    io.emit('chat message', msg);
  });

  //sending back the message
  socket.on('disconnect', (data) => {
    console.log('user disconnected');
    console.log('diconnect data: ' + data);
  });
});

server.listen(PORT, () => {
  connectToDB();
  console.log(`app running at port ${PORT}`);
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('start stream');
  const chatStream = connection.collection('chats').watch();
  chatStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert':
        let newChat = {
          _id: change.fullDocument._id,
          chat: change.fullDocument.chat,
          user: change.fullDocument.user,
        };
        return io.emit('newChat', newChat);
      case 'update':
        let editChat = {
          _id: change.fullDocument._id,
          chat: change.fullDocument.chat,
          user: change.fullDocument.user,
        };
        return io.emit('editChat', editChat);
      case 'delete':
        return io.emit('deleteChat', change.documentKey._id);
      default:
        break;
    }
  });
});
