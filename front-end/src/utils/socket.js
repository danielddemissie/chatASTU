import io from 'socket.io-client';
const url = 'http://localhost:4300/api';

let socket;
const socketURL = `${url}/socket`;

export function cleanUpSocket() {
  console.log('disconnected');
  return socket.disconnect();
}

export function connectToSocket(room, user) {
  socket = io(socketURL);
  console.log('user connected');
  if (room && user) {
    socket.emit('joinRoom', { user, room }, (error) => {
      console.log('joined error : ' + error);
    });
  }
}
export function sendMessage(user, room, msg) {
  if (!socket) return;
  socket.emit('message', { user, room, msg }, (error) => {
    console.log('sendMessage error : ' + error);
  });
}

export function getMessage(cb) {
  if (!socket) return;
  socket.on('message', (data) => {
    console.log(data);
    return cb(null, data);
  });
}

export function onWelcomeMessage(cb) {
  if (!socket) return;
  socket.once('welcomeMessage', (msg) => {
    return cb(null, msg);
  });
}
