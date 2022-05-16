const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const conneToDB = require('./db.config');
const { userRoutes } = require('./routes');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4200;

//create new io server with
// your http server
const io = new Server(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use('/api', userRoutes);
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
  conneToDB();
  console.log(`app running at port ${PORT}`);
});

//address in use
