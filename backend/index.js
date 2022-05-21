const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const http = require('http');
const { userRoutes, chatRoutes, roomRoutes } = require('./routes');
const connectToDB = require('./db.config');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 4200;

//create new io server
//with http server
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/socket', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use('/api', userRoutes);
app.use('/api', chatRoutes);
app.use('/api', roomRoutes);

// Run first when client connects
io.of('/api/socket').on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
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

//run server
server.listen(PORT, () => {
  connectToDB();
  console.log(`app running at port ${PORT}`);
});
